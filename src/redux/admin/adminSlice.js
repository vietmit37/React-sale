import {
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

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
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
  },
});

export const { searchUser } = adminSlice.actions;

const { reducer: adminReducer } = adminSlice;
export default adminReducer;
