import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import { InitialAuthInterface, initialState, LoadingStatus } from "./state";
import { handleLoginPost } from "./thunk";

export const createReducers = () => {
  return {};
};

export const createExtraReducers = <T>() => {
  return (builder: ActionReducerMapBuilder<T>) => {
    builder
      .addCase(handleLoginPost.fulfilled, (state, action) => {
        return { ...state, error: "", loading: LoadingStatus.FINISH, sessionId: action.payload.sessionId };
      })
      .addCase(handleLoginPost.rejected, (state, action) => {
        console.log(action);
        return { ...state, error: "error occured!", loading: LoadingStatus.ERROR };
      })
      .addCase(handleLoginPost.pending, (state, action) => {
        return { ...state, error: "", loading: LoadingStatus.LOADING };
      });
  };
};
