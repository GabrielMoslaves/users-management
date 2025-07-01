const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/add", (req, res) => {
  const { name, phone, email, accountType, profileImage, password } = req.body;
  User.create({
    name,
    phone,
    email,
    accountType,
    profileImage,
    password,
  })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Erro ao dicionar usuario" });
    });
});

router.patch("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone, email, accountType, profileImage, password } = req.body;

  User.update(
    {
      name,
      phone,
      email,
      accountType,
      profileImage,
      password,
    },
    {
      where: { id },
    }
  )
    .then((affectedRows) => {
      if (affectedRows > 0) {
        return User.findByPk(id); // Busca o usuário atualizado
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    })
    .then((updatedUser) => {
      if (updatedUser) {
        res.status(200).json(updatedUser); // Retorna os dados atualizados
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Erro ao editar usuário" });
    });
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  User.destroy({
    where: { id: id },
  })
    .then((deleted) => {
      if (deleted) {
        res.status(200).json({ message: "Usuário excluído com sucesso" });
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Erro ao excluir usuário" });
    });
});

router.get("/all-users", (_, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(`Erro ao obter usuários: ${err}`);
      res.status(500).json({ error: "Erro ao obter usuários" });
    });
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.json(user);
    })
    .catch((e) =>
      res
        .status(500)
        .json({ message: "Erro ao buscar usuário", error: e.message })
    );
});

module.exports = router;
