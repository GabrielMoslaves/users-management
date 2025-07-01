import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect } from "react";
import TextField from "../../Components/TextField/TextField";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSession } from "../../Providers/SessionProvider";
import { useUsers } from "../../Providers/UsersProvider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextFieldPhone from "../../Components/TextFieldPhone/TextFieldPhone";

const ProfilePage = () => {
  const { userId } = useParams();
  const { session } = useSession();
  const { updateUser, fetchUser } = useUsers();

  const schema = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório"),
    phone: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      profileImage: "",
      email: "",
      phone: "",
      password: "",
      accountType: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      updateUser(values, userId);
    },
  });

  useEffect(() => {
    fetchUser(userId)
      .then((user) => {
        formik.setValues({
          profileImage: user?.profileImage,
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: user.password,
          accountType: user.accountType,
        });
      })
      .catch((e) => console.log(e));
  }, []);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      padding={2}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h4" align="flex-start">
            Gerenciamento de Perfil
          </Typography>
          <Typography variant="h6" align="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lobortis maximus
          </Typography>
          <Box
            gap={2}
            display="grid"
            gridTemplateColumns="2fr 1fr"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              helperText={formik.errors.name}
              error={Boolean(formik.errors.name)}
              {...formik.getFieldProps("name")}
              id="name"
              name="name"
              label="Nome"
              labelVariant="h6"
              fullWidth
            />

            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                onChange={(e) =>
                  formik.setFieldValue("profileImage", e.target.files[0])
                }
                type="file"
              />
            </Button>
          </Box>
          <TextField
            helperText={formik.errors.email}
            error={Boolean(formik.errors.email)}
            {...formik.getFieldProps("email")}
            id="email"
            name="email"
            label="Email"
            labelVariant="h6"
            fullWidth
          />

          <TextFieldPhone
            helperText={formik.errors.phone}
            error={Boolean(formik.errors.phone)}
            {...formik.getFieldProps("phone")}
            id="phone"
            labelVariant="h6"
            name="phone"
            fullWidth
            type="text"
            label="Telefone"
          />

          <TextField
            helperText={formik.errors.password}
            error={Boolean(formik.errors.password)}
            {...formik.getFieldProps("password")}
            id="password"
            name="password"
            label="Senha"
            labelVariant="h6"
            fullWidth
            type="password"
          />
          {session.accountType === "admin" && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              width="100%"
            >
              <Typography variant="h5">Tipo de conta</Typography>
              <RadioGroup
                {...formik.getFieldProps("accountType")}
                id="accountType"
                aria-label="user type"
              >
                <FormControlLabel
                  checked={formik.values.accountType === "admin"}
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  checked={formik.values.accountType === "user"}
                  value="user"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </Box>
          )}
          <Button
            type="submit"
            sx={{
              borderRadius: 10,
              paddingY: 2,
              paddingX: 6,
              width: "fit-content",
            }}
            variant="contained"
            size="small"
          >
            salvar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProfilePage;
