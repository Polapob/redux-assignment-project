import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import apiClient from "../../../utils/axios";

interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export const handleLoginPost = createAsyncThunk("auth/login", async (postData: Record<"email" | "password", string>, { rejectWithValue }) => {
  try {
    const response = await apiClient.post("auth/login", postData);
    return response.data;
  } catch (err) {
    let error = err as AxiosError<ValidationErrors>; // cast the error for access
    if (!error.response) {
      throw err;
    }
    return rejectWithValue(error.response.data);
  }
});
