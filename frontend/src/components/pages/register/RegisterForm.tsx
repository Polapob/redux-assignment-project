import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import register from "../../../../pages/register";
import { registerFormPresenter } from "../../../presenter/formPresenter";
import FormInputField from "../../common/FormInputField";
import useFormSubmit from "../../../hooks/useFormSubmit";

const RegisterForm = () => {
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
      role: "USER",
    },
  });

  const [onSubmit] = useFormSubmit({ handleSubmit, formSubmitType: "register" });
  return (
    <Box
      component="form"
      sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", rowGap: "0.5rem" }}
      onSubmit={onSubmit}
    >
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
  );
};
export default RegisterForm;
