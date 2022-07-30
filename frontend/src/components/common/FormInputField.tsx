import { Typography, FormControl, OutlinedInput, FormHelperText } from "@mui/material";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form/dist/types";

interface IFormInputField extends UseFormRegisterReturn {
  title: string;
  isError?: boolean;
  autoComplete?: string;
  errorMessage?: string;
  isRequired?: boolean;
}

const FormInputField = ({ title, isError, autoComplete, errorMessage, isRequired = false, ...restProps }: IFormInputField) => {
  return (
    <>
      <Typography component="span" sx={{ color: "black", fontSize: "1.25rem", fontWeight: "700" }}>
        {title} {isRequired && <Typography sx={{ display: "inline-flex", height: "100%", color: "red" }}>*</Typography>}
      </Typography>
      <FormControl sx={{ width: "100%" }}>
        <OutlinedInput error={isError} autoComplete={autoComplete} {...restProps} />
        <FormHelperText sx={{ width: "100%", margin: "0px", color: "red" }}>{errorMessage}</FormHelperText>
      </FormControl>
    </>
  );
};

export default FormInputField;
