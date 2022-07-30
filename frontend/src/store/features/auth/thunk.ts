import { createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import apiClient from "../../../utils/axios";
import { AppDispatch } from "../../store";
import { InitialAuthInterface } from "./state";

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export type ILoginType = {
  email: string;
  password: string;
};

export type IRegisterType = {
  email: string;
  password: string;
  nickname: string;
  firstname: string;
  lastname: string;
};

export const handleLoginPost = createAsyncThunk<
  any,
  ILoginType,
  {
    rejectValue: ValidationErrors;
  }
>("auth/login", async (postData: ILoginType, thunkApi) => {
  try {
    const response = await apiClient.post("auth/login", postData);
    return response.data;
  } catch (err) {
    let error = err as AxiosError<ValidationErrors>; // cast the error for access
    if (!error.response) {
      throw err;
    }
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const handleRegisterPost = createAsyncThunk<any, IRegisterType, { rejectValue: ValidationErrors }>(
  "auth/register",
  async (postData: IRegisterType, thunkApi) => {
    try {
      const response = await apiClient.post("auth/register", { ...postData, role: "USER" });
      return response.data;
    } catch (err) {
      let error = err as AxiosError<ValidationErrors>;
      if (!error.response) {
        throw err;
      }
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
