import { Path, RegisterOptions, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

export const registerFormPresenter = <T>(formTitle: Path<T>, register: UseFormRegister<T>, options?: RegisterOptions): UseFormRegisterReturn => {
  return { ...{ ...register(formTitle, options) } };
};
