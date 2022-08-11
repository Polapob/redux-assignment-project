import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import useFormSubmit from "../../../hooks/useFormSubmit";
import { registerFormPresenter } from "../../../presenter/formPresenter";
import FormInputField from "../../common/FormInputField";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [onSubmit] = useFormSubmit({ handleSubmit, formSubmitType: "login" });
  return (
    <Box component="form" sx={{ width: "50%", rowGap: "0.5rem", display: "flex", flexDirection: "column" }} onSubmit={onSubmit}>
      <FormInputField
        isRequired
        title="Email"
        {...registerFormPresenter("email", register, {
          required: "email is required field",
          pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email address!" },
        })}
        errorMessage={errors.email?.message}
        autoComplete="off"
        isError={!!errors.email?.message}
      />
      <FormInputField
        isRequired
        inputType="password"
        title="Password"
        {...registerFormPresenter("password", register, {
          required: "password is required field",
        })}
        errorMessage={errors.password?.message}
        autoComplete="off"
        isError={!!errors.password?.message}
      />
      <Button type="submit" variant="contained" sx={{ margin: "2rem 0rem" }}>
        Login
      </Button>
    </Box>
  );
};
export default LoginForm;
