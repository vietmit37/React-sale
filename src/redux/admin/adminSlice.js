import {
  adminBulkCreateUser,
  adminCreateUser,
  adminDeleteUser,
  adminGetAllUser,
  adminGetBookPagination,
  adminGetCategory,
  adminUpdateUser,
  adminUploadImgBook,
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
// Book
export const actGetPaginationBook = createAsyncThunk(
  "admin/actGetPaginationBook",
  adminGetBookPagination()
);
export const actGetCategory = createAsyncThunk(
  "admin/actGetCategory",
  adminGetCategory()
);
export const actUploadImgBook = createAsyncThunk(
  "admin/actUploadImgBook",
  adminUploadImgBook()
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: null,
    error: null,
    categories: null,
    isLoading: true,
  },
  reducers: {},
  extraReducers: {
    // Get all user
    [actGetAllUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [actGetAllUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
    // Get Category Book
    [actGetCategory.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    [actGetCategory.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { searchUser } = adminSlice.actions;

const { reducer: adminReducer } = adminSlice;
export default adminReducer;
