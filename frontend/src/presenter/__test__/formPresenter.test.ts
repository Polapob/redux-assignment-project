import { ChangeEvent } from "react";
import { ChangeHandler, RegisterOptions, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { registerFormPresenter } from "../formPresenter";

type FieldValues = {
  [x: string]: any;
};

type RegisterReturnType = UseFormRegister<FieldValues>;

const mockRegisterFn: RegisterReturnType = (name, options) => {
  return {
    onChange: options?.onChange ? (options.onChange as ChangeHandler) : async (event: { target: any; type?: any }) => {},
    onBlur: options?.onBlur ? (options.onBlur as ChangeHandler) : async (event: { target: any; type?: any }) => {},
    ref: (instance: any) => {},
    min: options?.min as string | number | undefined,
    max: options?.max as string | number | undefined,
    maxLength: options?.maxLength as number | undefined,
    minLength: options?.minLength as number | undefined,
    pattern: options?.pattern as string | undefined,
    required: options?.required as boolean | undefined,
    disabled: options?.required as boolean | undefined,
    name,
  };
};

const mockOption1 = {
  min: 50,
  max: 250,
  required: true,
};

const mockOption2 = {
  min: "50",
  max: "200",
  required: false,
  pattern: /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/,
  disabled: false,
  minLength: 132,
};

describe("testing formPresenter function", () => {
  it("run formPresenter without options", () => {
    const mockFormTitle = "exampleFormTitle";
    const { name } = registerFormPresenter(mockFormTitle, mockRegisterFn);
    expect(name).toBe(mockFormTitle);
  });

  it("run formPresenter with options case1", () => {
    const mockFormTitle = "exampleFormTitle2";
    const { min, max, required, name } = registerFormPresenter(mockFormTitle, mockRegisterFn, mockOption1);
    expect({ name, min, max, required }).toStrictEqual({ ...mockOption1, name: mockFormTitle });
  });

  it("run formPresenter with options case2", () => {
    const mockFormTitle = "exampleFormTitle3";
    const { min, max, required, pattern, disabled, minLength, name } = registerFormPresenter(mockFormTitle, mockRegisterFn, mockOption2);
    expect({ min, max, required, pattern, disabled, minLength, name }).toStrictEqual({ ...mockOption2, name: mockFormTitle });
  });
});
