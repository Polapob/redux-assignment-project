import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { registerFormPresenter } from "../../../presenter/formPresenter";
import FormInputField from "../../common/FormInputField";
import useFormSubmit from "../../../hooks/useFormSubmit";
import LoadingModal from "../../common/Modal/LoadingModal";
import { RootState, useAppSelector } from "../../../store/store";
import { LoadingStatus } from "../../../store/features/auth/state";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      nickName: "",
      firstName: "",
      lastName: "",
      role: "USER",
    },
  });

  const [onSubmit] = useFormSubmit({ handleSubmit, formSubmitType: "register" });
  const { loading, error, sessionId } = useAppSelector((state: RootState) => state.auth);
  return (
    <Box
      component="form"
      sx={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", rowGap: "0.5rem" }}
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
        isError={!!errors?.nickName}
        errorMessage={errors.nickName?.message}
        {...registerFormPresenter("nickName", register, {})}
      />
      <FormInputField
        title="Firstname"
        autoComplete="off"
        isError={!!errors?.firstName}
        errorMessage={errors.firstName?.message}
        {...registerFormPresenter("firstName", register, {})}
      />
      <FormInputField
        title="Lastname"
        autoComplete="off"
        isError={!!errors?.lastName}
        errorMessage={errors.lastName?.message}
        {...registerFormPresenter("lastName", register, {})}
      />
      <Button type="submit" variant="contained" sx={{ margin: "2rem 0rem" }} fullWidth>
        Register
      </Button>
      <LoadingModal open={loading === LoadingStatus.LOADING} />
    </Box>
  );
};
export default RegisterForm;
