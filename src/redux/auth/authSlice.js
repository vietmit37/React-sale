import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  authLoginAPI,
  authLogoutAPI,
  authRegisterAPI,
  getAccountAPI,
} from "./authApi";

export const actRegister = createAsyncThunk(
  "auth/actRegister",
  authRegisterAPI()
);
export const actLogin = createAsyncThunk("auth/actLogin", authLoginAPI());
export const actGetAccount = createAsyncThunk(
  " auth/actGetAccount",
  getAccountAPI()
);
export const actLogout = createAsyncThunk("auth/actLogout", authLogoutAPI());

const autSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    error: null,
    isAuthenticated: false,
    isLoading: true,
  },
  extraReducers: {
    // Register
    [actRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [actRegister.rejected]: (state, action) => {
      state.error = action.payload;
    },
    // Login
    [actLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [actLogin.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    //get Account
    [actGetAccount.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    [actGetAccount.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    // Log out
    [actLogout.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = false;
    },
    [actLogout.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { data, error, isLoading, isAuthenticated } = autSlice.actions;

const { reducer: authReducer } = autSlice;
export default authReducer;
