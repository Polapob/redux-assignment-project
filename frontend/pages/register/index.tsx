import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import FormInputField from "../../src/components/common/FormInputField";
import { registerFormPresenter } from "../../src/presenter/formPresenter";
import useFormSubmit from "../../src/hooks/useFormSubmit";
import RegisterForm from "../../src/components/pages/register/RegisterForm";
import LinkTypography from "../../src/components/common/Typography/LinkTypography";
import { ReactElement } from "react";
import FormLayoutWrapper from "../../src/components/layout/FormLayoutWrapper";

const RegisterPage = () => {
  return (
    <>
      <Typography sx={{ color: "black", fontSize: "2rem", fontWeight: "bold", margin: "2rem 0rem" }}>Register Page</Typography>
      <RegisterForm />
      <LinkTypography href="/login" linkText="Login here">
        If you already register{" "}
      </LinkTypography>
    </>
  );
};

RegisterPage.getLayout = (page: ReactElement) => {
  return <FormLayoutWrapper>{page}</FormLayoutWrapper>;
};

export default RegisterPage;
