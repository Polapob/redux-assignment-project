import { Stack, Typography, OutlinedInput, Button, FormControl, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useCallback, FormEventHandler, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import FormInputField from "../../src/components/common/FormInputField";
import LoginForm from "../../src/components/pages/login/LoginForm";
import { handleLoginPost } from "../../src/store/features/auth/thunk";
import { RootState, useAppDispatch } from "../../src/store/store";

export type LoginBodyTypes = Record<"email" | "password", string>;

const LoginPage = () => {
  return (
    <Stack sx={{ background: "white", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Typography sx={{ color: "black", fontSize: "2rem", textAlign: "center", margin: "2rem 0rem" }}>Login Page</Typography>
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
