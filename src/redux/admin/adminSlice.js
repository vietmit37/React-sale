import {
  UploadAvtUser,
  UserChangePassW,
  adGetDasboard,
  adminBulkCreateUser,
  adminCreateUser,
  adminDeleteUser,
  adminGetAllUser,
  adminUpdateUser,
} from "./adminApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// User
export const actGetAllUser = createAsyncThunk(
  "admin/actGetAllUser",
  adminGetAllUser()
);
export const actCreateUser = createAsyncThunk(
  "admin/actCreateUser",
  adminCreateUser()
);
export const actBulkCreateUser = createAsyncThunk(
  "admin/actBulkCreateUser",
  adminBulkCreateUser()
);
export const actUpdateUser = createAsyncThunk(
  "admin/actUpdateUser",
  adminUpdateUser()
);
export const actDeleteUser = createAsyncThunk(
  "admin/actDeleteUser",
  adminDeleteUser()
);
export const actUploadAvtUser = createAsyncThunk(
  "admin/actUploadAvtUser",
  UploadAvtUser()
);
export const actChangePassW = createAsyncThunk(
  "admin/actChangePassW",
  UserChangePassW()
);
export const actGetDashboard = createAsyncThunk(
  "admin/actGetDashboard",
  adGetDasboard()
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: null,
    error: null,
    dasboard: null,
    isLoading: false,
  },

  extraReducers: {
    // Get all user
    [actGetAllUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [actGetAllUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [actGetAllUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
    // Get Dashboard
    [actGetDashboard.pending]: (state, action) => {
      state.isLoading = true;
    },
    [actGetDashboard.fulfilled]: (state, action) => {
      state.dasboard = action.payload;
      state.isLoading = false;
    },
    [actGetDashboard.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {} = adminSlice.actions;

const { reducer: adminReducer } = adminSlice;
export default adminReducer;
