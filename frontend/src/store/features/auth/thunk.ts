import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../../utils/axios";

const handleLoginPost = createAsyncThunk("auth/login", async (postData: Record<"email" | "password", string>) => {
  const response = await apiClient.post("/auth/login");
  return response;
});
