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
    tempAvt: null,
    isAuthenticated: false,
    isLoading: true,
  },
  reducers: {
    // Update account
    doUpdateUserInf: (state, action) => {
      state.data.avatar = action.payload.avatar;
      state.data.fullName = action.payload.fullName;
      state.data.phone = action.payload.phone;
    },
    doUpdateTempAvt: (state, action) => {
      state.tempAvt = action.payload;
    },
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

export const { doUpdateUserInf, doUpdateTempAvt } = autSlice.actions;

const { reducer: authReducer } = autSlice;
export default authReducer;
