import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import apiClient from "../../../../utils/axios";
import { ILoginType, ValidationErrors } from "./type";

const handleLoginPost = createAsyncThunk<
  any,
  ILoginType,
  {
    rejectValue: ValidationErrors;
  }
>("auth/login", async (postData: ILoginType, thunkApi) => {
  try {
    const { data } = await apiClient.post("auth/login", postData);
    return data;
  } catch (err) {
    const error = err as AxiosError<ValidationErrors>; // cast the error for access
    if (!error.response?.data) {
      return thunkApi.rejectWithValue({
        statusCode: 500,
        message: error.message,
        error: error.message,
      });
    }
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export default handleLoginPost;
