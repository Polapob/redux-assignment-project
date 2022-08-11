import { Stack, Typography, Box } from "@mui/material";
import { ReactElement } from "react";
import LinkTypography from "../../src/components/common/Typography/LinkTypography";
import FormLayoutWrapper from "../../src/components/layout/FormLayoutWrapper";
import LoginForm from "../../src/components/pages/login/LoginForm";

export type LoginBodyTypes = Record<"email" | "password", string>;

const LoginPage = () => {
  return (
    <>
      <Typography sx={{ color: "black", fontSize: "2rem", textAlign: "center", margin: "2rem 0rem", fontWeight: "bold" }}>Login Page</Typography>
      <LoginForm />
      <LinkTypography href="/register" linkText="Register here">
        If you doesn&apos;t have an account{" "}
      </LinkTypography>
    </>
  );
};

LoginPage.getLayout = (page: ReactElement) => {
  return <FormLayoutWrapper>{page}</FormLayoutWrapper>;
};

export default LoginPage;
