import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTest } from "./testApi";

export const getFetchTest = createAsyncThunk("test/getTest", fetchTest());

const testSlice = createSlice({
  name: "test",
  initialState: {
    status: "idle",
    test: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFetchTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFetchTest.fulfilled, (state, action) => {
        state.status = "idle";
        state.test = action.payload;
      });
    // .addCase(getFetchTest.rejected, (state, action) => {
    //   state.status = false;
    // });
  },
});

export const { test, status } = testSlice.actions;

const { reducer: testReducer } = testSlice;
export default testReducer;
