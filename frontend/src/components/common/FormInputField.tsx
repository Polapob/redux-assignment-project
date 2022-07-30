import { Typography, FormControl, OutlinedInput, FormHelperText } from "@mui/material";
import React, { useRef } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form/dist/types";

interface IFormInputFieldProps extends Omit<UseFormRegisterReturn, "ref"> {
  title: string;
  isError?: boolean;
  autoComplete?: string;
  errorMessage?: string;
  isRequired?: boolean;
  inputType?: "text" | "password";
}

const FormInputField = (
  { title, isError, autoComplete, errorMessage, isRequired = false, inputType = "text", ...restProps }: IFormInputFieldProps,
  ref: any
) => {
  return (
    <>
      <Typography component="span" sx={{ color: "black", fontSize: "1.25rem", fontWeight: "700" }}>
        {title} {isRequired && <Typography sx={{ display: "inline-flex", height: "100%", color: "red" }}>*</Typography>}
      </Typography>
      <FormControl sx={{ width: "100%" }}>
        <OutlinedInput error={isError} ref={ref} type={inputType as string} autoComplete={autoComplete} {...restProps} />
        <FormHelperText sx={{ width: "100%", margin: "0px", color: "red" }}>{errorMessage}</FormHelperText>
      </FormControl>
    </>
  );
};

export default React.forwardRef<HTMLInputElement, IFormInputFieldProps>(FormInputField);
