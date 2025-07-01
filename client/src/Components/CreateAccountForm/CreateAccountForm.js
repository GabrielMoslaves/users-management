import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../FormContainer";
import TextField from "../TextField/TextField";
import { useUsers } from "../../Providers/UsersProvider";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextFieldPhone from "../TextFieldPhone/TextFieldPhone";

const CreateAccountForm = ({ setShowModal }) => {
  const navigate = useNavigate();
  const { createUser } = useUsers();
  const { pathname } = useLocation();

  const schema = yup.object({
    pathname: yup.string(),
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    phone: yup.string().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
    name: yup.string().required("Campo obrigatório"),
    agreeTerms: yup.boolean().when("pathname", (pathname, schema) => {
      if (pathname[0] === "/gerenciamento-de-contas") {
        return schema.notRequired();
      } else {
        return schema
          .oneOf([true], "Você deve concordar com os termos")
          .required("Você deve concordar com os termos");
      }
    }),
  });

  const formik = useFormik({
    initialValues: {
      pathname: window.location.pathname,
      name: "",
      profileImage: "",
      email: "",
      phone: "",
      password: "",
      accountType: "user",
      agreeTerms: false,
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: (values) => {
      createUser(values, setShowModal, pathname, navigate)},
  });

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
      justifyContent="center"
      padding={2}
    >
      <form onSubmit={formik.handleSubmit}>
        <FormContainer gap={2} padding={4}>
          <img src="./logo.png" width={250} alt="logo" />
          <Typography variant="h5" align="center">
            Crie uma conta
          </Typography>
          <Typography variant="span" align="center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            lobortis maximus
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="2fr 1fr"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            gap={2}
          >
            <TextField
              inputProps={{ "data-testid": "textbox name" }}
              size="small"
              helperText={formik.errors.name}
              error={Boolean(formik.errors.name)}
              {...formik.getFieldProps("name")}
              name="name"
              id="name"
              label="Nome"
              labelVariant="span"
            />
            <Box>
              <InputLabel>Foto de perfil</InputLabel>
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
          </Box>

          <TextField
            inputProps={{ "data-testid": "textbox email" }}
            size="small"
            helperText={formik.errors.email}
            error={Boolean(formik.errors.email)}
            {...formik.getFieldProps("email")}
            name="email"
            id="email"
            label="Email"
            labelVariant="span"
            fullWidth
          />
          <TextFieldPhone
            onChange={(e) => {
              formik.setFieldValue("phone", e.target.value);
            }}
            value={formik.values.phone}
            size="small"
            helperText={formik.errors.phone}
            error={Boolean(formik.errors.phone)}
            name="phone"
            labelVariant="span"
            type="text"
            label="Telefone"
            id="phone"
          />
          <TextField
            inputProps={{ "data-testid": "textbox password" }}
            size="small"
            {...formik.getFieldProps("password")}
            helperText={formik.errors.password}
            error={Boolean(formik.errors.password)}
            name="password"
            label="Senha"
            labelVariant="span"
            fullWidth
            type="password"
            id="password"
          />
          {pathname === "/gerenciamento-de-contas" && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              width="100%"
            >
              <Typography variant="span">Tipo de conta</Typography>
              <RadioGroup
                aria-label="accountType"
                id="accountType"
                {...formik.getFieldProps("accountType")}
              >
                <FormControlLabel
                  defaultChecked={true}
                  value="admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="user"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </Box>
          )}

          {pathname === "/criar-uma-conta" && (
            <FormControl
              required
              error={Boolean(formik.errors.agreeTerms)}
              component="fieldset"
              variant="standard"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id="agreeTerms"
                    name="agreeTerms"
                    inputProps={{ "aria-label": "controlled" }}
                    {...formik.getFieldProps("agreeTerms")}
                  />
                }
                label="Ao criar uma conta, declaro que li e aceito os termos de uso e políticas de privacidade"
              />
              <FormHelperText>{formik.errors.agreeTerms}</FormHelperText>
            </FormControl>
          )}

          <Button
            type="submit"
            sx={{ borderRadius: 10, padding: 2, width: "100%" }}
            variant="contained"
          >
            Criar conta
          </Button>
        </FormContainer>
      </form>
    </Box>
  );
};

export default CreateAccountForm;
