import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./features/auth/authSlice";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export default rootReducer;
