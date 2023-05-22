import { order } from "@/service/orderService";

export const orderPaymentBook = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await order.callPlaceOrder(data);
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err.response.data.message);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const orderHistory = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await order.getHistoryOrder();
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err.response.data.message);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};
