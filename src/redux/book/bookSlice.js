import {
  adminCreatBook,
  adminGetBookId,
  adminGetBookPagination,
  adminGetCategory,
  adminUpdateBook,
  adminUploadImgBook,
} from "./bookApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Book
export const actGetPaginationBook = createAsyncThunk(
  "book/actGetPaginationBook",
  adminGetBookPagination()
);
export const actGetCategory = createAsyncThunk(
  "book/actGetCategory",
  adminGetCategory()
);
export const actGetBookId = createAsyncThunk(
  "book/actGetBookId",
  adminGetBookId()
);
export const actUploadImgBook = createAsyncThunk(
  "book/actUploadImgBook",
  adminUploadImgBook()
);
export const actCreateBook = createAsyncThunk(
  "book/actCreateBook",
  adminCreatBook()
);
export const actUpdateBook = createAsyncThunk(
  "book/actUpdateBook",
  adminUpdateBook()
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    error: null,
    categories: null,
    books: null,
    bookId: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    // Get Book
    [actGetPaginationBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [actGetPaginationBook.fulfilled]: (state, action) => {
      state.books = action.payload.result;
      state.isLoading = false;
    },
    [actGetPaginationBook.rejected]: (state, action) => {
      state.error = action.payload;
    },
    // Get Book Id
    [actGetBookId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [actGetBookId.fulfilled]: (state, action) => {
      state.bookId = action.payload;
      state.isLoading = false;
    },
    [actGetBookId.rejected]: (state, action) => {
      state.error = action.payload;
    },
    // Get Category Book
    [actGetCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [actGetCategory.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    [actGetCategory.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {} = bookSlice.actions;

const { reducer: bookReducer } = bookSlice;
export default bookReducer;
