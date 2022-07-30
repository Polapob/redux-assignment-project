import { Box, Button, FormControl, FormHelperText, OutlinedInput, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { title } from "process";
import { useForm } from "react-hook-form";
import FormInputField from "../../src/components/common/FormInputField";
import { registerFormPresenter } from "../../src/presenter/formPresenter";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      nickname: "",
      firstname: "",
      lastname: "",
    },
  });

  return (
    <Stack sx={{ backgroundColor: "white", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography sx={{ color: "black", fontSize: "2rem", fontWeight: "bold", margin: "2rem 0rem" }}>Register Page</Typography>
        <Box component="form" sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", rowGap: "0.5rem" }}>
          <FormInputField
            title="Email"
            isRequired
            autoComplete="off"
            isError={!!errors?.email}
            errorMessage={errors.email?.message}
            {...registerFormPresenter("email", register, {
              required: "email is required field.",
              pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email address!" },
            })}
          />
          <FormInputField
            title="Password"
            inputType="password"
            isRequired
            autoComplete="off"
            isError={!!errors?.password}
            errorMessage={errors.password?.message}
            {...registerFormPresenter("password", register, {
              required: "password is required field.",
            })}
          />
          <FormInputField
            title="Nickname"
            autoComplete="off"
            isError={!!errors?.nickname}
            errorMessage={errors.nickname?.message}
            {...registerFormPresenter("nickname", register, {})}
          />
          <FormInputField
            title="Firstname"
            autoComplete="off"
            isError={!!errors?.firstname}
            errorMessage={errors.firstname?.message}
            {...registerFormPresenter("firstname", register, {})}
          />
          <FormInputField
            title="Lastname"
            autoComplete="off"
            isError={!!errors?.lastname}
            errorMessage={errors.lastname?.message}
            {...registerFormPresenter("lastname", register, {})}
          />
          <Button type="submit" variant="contained" sx={{ margin: "2rem 0rem" }} fullWidth>
            Register
          </Button>
        </Box>
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
