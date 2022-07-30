import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import { InitialAuthInterface, initialState, LoadingStatus } from "./state";
import handleLoginPost from "./thunk/handleLoginPost";

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
        return { ...state, error: action.payload?.message, loading: LoadingStatus.ERROR };
      })
      .addCase(handleLoginPost.pending, (state, action) => {
        return { ...state, error: "", loading: LoadingStatus.LOADING };
      });
  };
};
