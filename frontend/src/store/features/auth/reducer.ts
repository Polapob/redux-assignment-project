import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import { InitialAuthInterface, initialState } from "./state";

export type ILoginType = {
  email: string;
  password: string;
};

export const createReducers = () => {
  const logout = (state: InitialAuthInterface) => {};
  const login = (state: InitialAuthInterface, action: ILoginType) => {};
  return {
    logout,
  };
};

export const createExtraReducers = <T>() => {
  return <T>(builder: ActionReducerMapBuilder<T>) => {
    const login = () => {};
    return {
      login,
    };
  };
};

const reducer = createReducer(initialState, (builder) => {});
