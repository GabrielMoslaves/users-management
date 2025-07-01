import { Box } from "@mui/material";
import React from "react";
import styles from "./styles.module.scss";
import CreateAccountForm from "../../../Components/CreateAccountForm/CreateAccountForm";


const CreateAccountModal = ({ show, setShowModal, fetchUsers }) => {
  if (!show) return;

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      setShowModal(false);
    }
  };
  return (
    <Box className={styles.modalOverlay} onClick={handleOutsideClick}>
      <CreateAccountForm
        setShowModal={setShowModal}
      />
    </Box>
  );
};

export default CreateAccountModal;
