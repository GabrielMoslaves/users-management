import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import FormContainer from "../../Components/FormContainer";
import styles from "./styles.module.scss";
import TextField from "../../Components/TextField/TextField";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useUsers } from "../../Providers/UsersProvider";
import { useSession } from "../../Providers/SessionProvider";

const Login = () => {
  const navigate = useNavigate();
  const { users, fetchUsers } = useUsers();
  const { handleLogin } = useSession();

  console.log({ users });
  const authenticateUser = async (values) => {
    const selectedAccount = users.find((item) => item.email === values.email);

    if (!selectedAccount) {
      formik.setFieldError("email", "Conta não encontrada");
      return;
    }

    if (selectedAccount && selectedAccount.password !== values.password) {
      formik.setFieldError("password", "Senha incorreta");
    } else {
      handleLogin({ ...selectedAccount, token: uuidv4() });
      navigate("/gerenciamento-de-contas");
    }
  };

  const schema = yup.object({
    email: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: authenticateUser,
  });

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <Box className={styles.background} width="100%" height="100vh">
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding={2}
      >
        <form onSubmit={formik.handleSubmit}>
          <Form Container gap={4} padding={9}>
            <img src="./logo.png" width={300} alt="logo" />
            <Typography variant="h4" align="center">
              Login
            </Typography>
            <Typography variant="h6" align="center">
              Não tem uma conta?{" "}
              <Link to="/criar-uma-conta">Cadastre-se aqui</Link>
            </Typography>
            <TextField
              helperText={formik.errors.email}
              error={Boolean(formik.errors.email)}
              {...formik.getFieldProps("email")}
              labelVariant="span"
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
            />
            <TextField
              helperText={formik.errors.password}
              error={Boolean(formik.errors.password)}
              labelVariant="span"
              {...formik.getFieldProps("password")}
              id="password"
              name="password"
              label="Senha"
              variant="outlined"
              fullWidth
              type="password"
            />
            <Button
              type="submit"
              sx={{ borderRadius: 10, padding: 2, width: "100%" }}
              variant="contained"
            >
              login
            </Button>
          </Form>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
