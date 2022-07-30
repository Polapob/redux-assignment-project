import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import apiClient from "../../../../utils/axios";
import { IRegisterType, ValidationErrors } from "./type";

const handleRegisterPost = createAsyncThunk<any, IRegisterType, { rejectValue: ValidationErrors }>(
  "auth/register",
  async (postData: IRegisterType, thunkApi) => {
    try {
      const response = await apiClient.post("auth/register", { ...postData, role: "USER" });
      return response.data;
    } catch (err) {
      let error = err as AxiosError<ValidationErrors>;
      if (!error.response?.data) {
        return thunkApi.rejectWithValue({
          statusCode: 500,
          message: error.message,
          error: error.message,
        });
      }
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export default handleRegisterPost;
