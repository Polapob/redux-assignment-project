import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";

export const registerFormPresenter = <T>(formTitle: Path<T>, register: UseFormRegister<T>, options?: RegisterOptions) => {
  return { ...{ ...register(formTitle, options) } };
};
