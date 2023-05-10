import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./test/testSlice";
import authReducer from "./auth/authSlice";
import adminReducer from "./admin/adminSlice";

export const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});
