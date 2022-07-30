import { Stack, Typography, OutlinedInput, Button, FormControl, FormHelperText } from "@mui/material";
import LoginForm from "../../src/components/pages/login/LoginForm";

export type LoginBodyTypes = Record<"email" | "password", string>;

const LoginPage = () => {
  return (
    <Stack sx={{ background: "white", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography sx={{ color: "black", fontSize: "2rem", textAlign: "center", margin: "2rem 0rem", fontWeight: "bold" }}>Login Page</Typography>
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
