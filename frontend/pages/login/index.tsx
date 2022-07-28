import { Stack, Typography, OutlinedInput, Button, FormControl, FormHelperText } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
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
  const [loginData, setLoginData] = useState<Record<"email" | "password", string>>({
    email: "",
    password: "",
  });

  return (
    <Stack sx={{ background: "white", minHeight: "100vh", display: "flex", justifyContent: "start", alignItems: "center" }}>
      <Typography sx={{ color: "black", fontSize: "2rem", textAlign: "center", margin: "2rem 0rem" }}>Login Page</Typography>
      <Box
        component="form"
        sx={{ width: "50%", rowGap: "0.5rem", display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit((data) => setLoginData(data))}
      >
        <Typography sx={{ color: "black", fontSize: "1.25rem", fontWeight: "700" }}>Email</Typography>
        <FormControl>
          <OutlinedInput
            error={!!errors.email?.message}
            autoComplete="off"
            {...register("email", {
              required: "email is required field",
              pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email address!" },
            })}
          />
          <FormHelperText sx={{ width: "100%", margin: "0px", color: "red" }}>{errors.email?.message}</FormHelperText>
        </FormControl>
        <Typography sx={{ color: "black", fontSize: "1.25rem", fontWeight: "700" }}>Password</Typography>
        <FormControl sx={{}}>
          <OutlinedInput
            error={!!errors.password?.message}
            autoComplete="off"
            {...register("password", {
              required: "password is required field",
            })}
          />
          <FormHelperText sx={{ width: "100%", margin: "0px", color: "red" }}>{errors.password?.message}</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ margin: "2rem 0rem" }}>
          Submit
        </Button>
      </Box>
    </Stack>
  );
};

export default LoginPage;
