import React, { createContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSession } from "../Providers/SessionProvider";

export const UsersContext = createContext();

export const apiURL = "http://localhost:3000";

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { session, handleLogout } = useSession();
  const [currentUser, setCurrentUser] = useState(null);

  console.log({users})
  const currentUserId = session?.id;

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const createUser = async (values, setShowModal, pathname, navigate) => {
    const auxValues = { ...values };
    delete auxValues.pathname;

    if (auxValues.profileImage) {
      auxValues.profileImage = await toBase64(auxValues.profileImage);
    }

    try {
      const response = await axios.post(`${apiURL}/user/add`, {
        ...auxValues,
      });
      if (pathname === "/criar-uma-conta") {
        navigate("/");
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Usuário criado!",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        setShowModal(false);
        setUsers((prevState) => [...prevState, { ...response.data }]);
      }
    } catch (e) {
      console.log( e );
    }
  };

  const updateUser = async (values, userId) => {
    const auxValues = { ...values };
    if (auxValues.profileImage) {
      auxValues.profileImage = await toBase64(auxValues.profileImage);
    }
    try {
      await axios.patch(`${apiURL}/user/edit/${userId}`, {
        ...auxValues,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Alterações salvas!",
        showConfirmButton: true,
        confirmButtonText: "OK",
      });
      fetchUser(userId);
      setUsers((prevState) =>
        prevState.map((user) => {
          if (user.id === userId) {
            return { ...user, ...auxValues };
          }
          return user;
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUser = async (userId) => {
    try {
      const { data: user } = await axios.get(`${apiURL}/user/user/${userId}`);
      setCurrentUser(user);
      return user;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${apiURL}/user/all-users`);
      setUsers(data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${apiURL}/user/delete/${id}`);
      setUsers((prevState) => prevState.filter((user) => user.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text:
        currentUserId === id
          ? "Você irá deletar o seu próprio usuário e será deslogado"
          : "Essa ação não pode ser revertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, exclua o usuário!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (currentUserId !== id) {
          Swal.fire({
            title: "Excluído!",
            text: "Usuário excluído com sucesso.",
            icon: "success",
          });
        }
        if (currentUserId === id) {
          handleLogout();
          window.location.href = "/";
        }
        deleteUser(id);
      }
    });
  };

  return (
    <UsersContext.Provider
      value={{
        setCurrentUser,
        currentUser,
        users,
        fetchUsers,
        fetchUser,
        handleDeleteUser,
        createUser,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
