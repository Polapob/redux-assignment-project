import { ActionReducerMapBuilder, createReducer } from "@reduxjs/toolkit";
import { InitialAuthInterface, initialState, LoadingStatus } from "./state";
import handleLoginPost from "./thunk/handleLoginPost";
import handleRegisterPost from "./thunk/handleRegisterPost";

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
      .addCase(handleLoginPost.pending, (state) => {
        return { ...state, error: "", loading: LoadingStatus.LOADING };
      })
      .addCase(handleRegisterPost.fulfilled, (state, action) => {
        return { ...state, error: "", loading: LoadingStatus.FINISH };
      })
      .addCase(handleRegisterPost.rejected, (state, action) => {
        return { ...state, error: action.payload?.message, loading: LoadingStatus.ERROR };
      })
      .addCase(handleRegisterPost.pending, (state, action) => {
        return { ...state, error: "", loading: LoadingStatus.LOADING };
      });
  };
};
