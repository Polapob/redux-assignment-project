import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useCallback, FormEventHandler, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { LoginBodyTypes } from "../../../../pages/login";
import { registerFormPresenter } from "../../../presenter/formPresenter";
import { handleLoginPost } from "../../../store/features/auth/thunk";
import { useAppDispatch, RootState } from "../../../store/store";
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

  const dispatch = useAppDispatch();
  const { loading, error, sessionId } = useSelector((state: RootState) => {
    return state.auth;
  });

  const postLogin = useCallback(
    async (loginBody: LoginBodyTypes) => {
      try {
        await dispatch(handleLoginPost(loginBody)).unwrap();
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = useMemo(() => {
    return handleSubmit(async (data) => {
      await postLogin(data);
    });
  }, [handleSubmit, postLogin]);

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
      <Typography component="span" sx={{ color: "black", fontSize: "1.25rem", fontWeight: "700", textAlign: "center" }}>
        If you doesn&apos;t have an account{" "}
        <Link href="/register">
          <Typography
            component="span"
            sx={{ textDecoration: "underline", display: "inline-block", margin: "0rem 0.5rem", color: "#FF9966", fontWeight: "700", fontSize: "1.25rem" }}
          >
            Register here
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};
export default LoginForm;
