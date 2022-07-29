import { Typography, FormControl, OutlinedInput, FormHelperText } from "@mui/material";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form/dist/types";

interface IFormInputField {
  title: string;
  isError?: boolean;
  autoComplete?: string;
  errorMessage?: string;
  formRegisterReturn: UseFormRegisterReturn;
}

const FormInputField = ({ title, isError, autoComplete, errorMessage, formRegisterReturn }: IFormInputField) => {
  return (
    <>
      <Typography sx={{ color: "black", fontSize: "1.25rem", fontWeight: "700" }}>{title}</Typography>
      <FormControl>
        <OutlinedInput error={isError} autoComplete={autoComplete} {...formRegisterReturn} />
        <FormHelperText sx={{ width: "100%", margin: "0px", color: "red" }}>{errorMessage}</FormHelperText>
      </FormControl>
    </>
  );
};

export default FormInputField;
