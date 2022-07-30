import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import FormInputField from "../../src/components/common/FormInputField";
import { registerFormPresenter } from "../../src/presenter/formPresenter";
import useFormSubmit from "../../src/hooks/useFormSubmit";
import RegisterForm from "../../src/components/pages/register/RegisterForm";

const RegisterPage = () => {
  return (
    <Stack sx={{ backgroundColor: "white", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ color: "black", fontSize: "2rem", fontWeight: "bold", margin: "2rem 0rem" }}>Register Page</Typography>
        <RegisterForm />
        <Typography component="span" sx={{ color: "black", fontSize: "1.25rem", fontWeight: "700", textAlign: "center" }}>
          If you already register{" "}
          <Link href="/login">
            <Typography
              component="span"
              sx={{ textDecoration: "underline", display: "inline-block", margin: "0rem 0.5rem", color: "#FF9966", fontWeight: "700", fontSize: "1.25rem" }}
            >
              Login here
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
};

export default RegisterPage;
