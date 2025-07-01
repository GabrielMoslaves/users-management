import { Box } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import CreateAccountForm from "../../Components/CreateAccountForm/CreateAccountForm";



const SignUp = () => {
  return (
    <Box className={styles.background} width="100%" height="100vh">
      <CreateAccountForm isModal/>
    </Box>
  );
};

export default SignUp;
