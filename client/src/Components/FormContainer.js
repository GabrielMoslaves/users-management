import { Box } from "@mui/material";
import React from "react";

const FormContainer = ({ children, padding, gap }) => {
  return (
    <Box
      width="700px"
      bgcolor="white"
      borderRadius={10}
      padding={padding}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={gap}
      boxShadow={6}
      border={0.5}
    >
      {children}
    </Box>
  );
};

export default FormContainer;
