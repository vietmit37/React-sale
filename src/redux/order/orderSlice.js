import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { orderHistory, orderPaymentBook } from "./orderApi";

export const actOrderPaymentBook = createAsyncThunk(
  "order/actOrderPaymentBook",
  orderPaymentBook()
);

export const actOrderHistory = createAsyncThunk(
  "order/actOrderHistory",
  orderHistory()
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    carts: [],
    order: null,
    orderHistory: null,
    isLoading: false,
  },
  reducers: {
    addCart: (state, action) => {
      let carts = state.carts;
      const items = action.payload;
      let indexCarts = carts.findIndex((c) => c._id === items._id);
      if (indexCarts > -1) {
        // quantity
        carts[indexCarts].quantityOrder =
          carts[indexCarts].quantityOrder + items.quantityOrder;
        if (
          carts[indexCarts].quantityOrder > carts[indexCarts].detail.quantity
        ) {
          carts[indexCarts].quantityOrder = carts[indexCarts].detail.quantity;
        }
      } else {
        carts.push({
          quantityOrder: items.quantityOrder,
          _id: items._id,
          detail: items.detail,
        });
      }
      message.success("Thêm vào giỏ hàng thành công");
      state.carts = carts;
    },
    updateCarts: (state, action) => {
      let carts = state.carts;
      const items = action.payload;
      let indexCarts = carts.findIndex((c) => c._id === items._id);
      if (indexCarts > -1) {
        // quantity
        carts[indexCarts].quantityOrder = items.quantityOrder;
        if (
          carts[indexCarts].quantityOrder > carts[indexCarts].detail.quantity
        ) {
          carts[indexCarts].quantityOrder = carts[indexCarts].detail.quantity;
        }
      } else {
        carts.push({
          quantityOrder: items.quantityOrder,
          _id: items._id,
          detail: items.detail,
        });
      }
      state.carts = carts;
    },
    deleteCarts: (state, action) => {
      console.log(action.payload);
      state.carts = state.carts.filter((c) => c._id !== action.payload._id);
    },
    doPlaceOrder: (state, action) => {
      let carts = state.carts;
      const items = action.payload.detail.map((item) => item._id);
      const tung3 = carts.filter((val) => {
        return items.indexOf(val._id) == -1;
      });
      state.carts = tung3;
    },
  },
  extraReducers: {
    [actOrderPaymentBook.pending]: (state, action) => {
      state.isLoading = true;
    },
    [actOrderPaymentBook.fulfilled]: (state, action) => {
      state.order = action.payload;
      state.isLoading = false;
    },
    [actOrderPaymentBook.rejected]: (state, action) => {
      state.error = action.payload;
    },
    // History order
    [actOrderHistory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [actOrderHistory.fulfilled]: (state, action) => {
      state.orderHistory = action.payload.result;
      state.isLoading = false;
    },
    [actOrderHistory.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addCart, updateCarts, deleteCarts, doPlaceOrder } =
  orderSlice.actions;

const { reducer: orderReducer } = orderSlice;
export default orderReducer;
