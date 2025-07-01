import { Avatar, Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../../Providers/SessionProvider";
import { useUsers } from "../../Providers/UsersProvider";


const MainNav = ({ children }) => {
  const navigate = useNavigate();
  const pathName = window.location.pathname.split("/")[1];
  const { handleLogout, session } = useSession();
  const { currentUser, fetchUser } = useUsers();

  const [image, setImage] = useState("");

  useEffect(() => {
    if (currentUser?.profileImage && currentUser?.profileImage !== "null") {
      const base64String = currentUser.profileImage;
      const blob = b64toBlob(base64String);
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl);
      return () => URL.revokeObjectURL(imageUrl);
    } else {
      setImage("../../../user-profile.jpg");
    }
  }, [currentUser]);

  useEffect(() => {
    if (pathName === "gerenciamento-de-contas") {
      fetchUser(session.id);
    }
  }, [pathName, session]);

  const b64toBlob = (base64String) => {
    const byteString = atob(base64String.split(",")[1]);
    const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.left}>
        <Avatar
          sx={{ width: 200, height: 200 }}
          alt="userProfile"
          src={image}
        />
        <Typography color="white" variant="h4">
          {pathName === "perfil-do-usuario"
            ? `Perfil de ${currentUser?.name}`
            : `Bem vindo(a), ${session?.name}`}
        </Typography>
        <Button
          onClick={() => navigate("/gerenciamento-de-contas")}
          color={pathName === "gerenciamento-de-contas" ? "warning" : "primary"}
          size="large"
          fullWidth
          startIcon={<GroupsIcon />}
          variant="contained"
        >
          Usuários
        </Button>
        <Button
          color={pathName === "perfil-do-usuario" ? "warning" : "primary"}
          onClick={() => navigate(`/perfil-do-usuario/${session?.id}`)}
          size="large"
          fullWidth
          startIcon={<PersonIcon />}
          variant="contained"
        >
          Gerenciar Perfil
        </Button>
      </Box>
      <Box className={styles.right}>
        <Box
          display="flex"
          justifyContent="space-between"
          height="fit-content"
          paddingY={2}
          paddingX={4}
          boxShadow={4}
        >
          <img alt="logo" src="./logo.png" width={200} />
          <Link  to="/" onClick={handleLogout}>
            Sair
          </Link>
        </Box>

        <Box padding={4}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MainNav;
