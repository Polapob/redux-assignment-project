import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* export const authSlice = createSlice({ name: "auth", initialState: {},reducers:{


} }); */

interface InitialAuthInterface {
  sessionId: string;
  error: null | string;
}

type ILoginType = {
  email: string;
  password: string;
};

const createInitialState = (): InitialAuthInterface => {
  return {
    sessionId: "",
    error: null,
  };
};

const postLogin = createAsyncThunk("auth/login", async (thunkAPI) => {});

const createReducers = () => {
  const logout = (state: InitialAuthInterface) => {};
  const login = (state: InitialAuthInterface, action: ILoginType) => {};
  return {
    logout,
  };
};

const createExtraReducers = () => {
  const login = () => {};
  return {
    login,
  };
};

const createExtraActions = () => {
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
  const login = () => {};

  return {
    login: login(),
  };
};

const name = "auth";
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });
