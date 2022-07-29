import { createSlice } from "@reduxjs/toolkit";
import { createExtraActions } from "./action";
import { createExtraReducers, createReducers } from "./reducer";
import { InitialAuthInterface, initialState } from "./state";

const name = "auth";
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers<InitialAuthInterface>();
const slice = createSlice({ name, initialState, reducers: {}, extraReducers });

export default slice.reducer;
