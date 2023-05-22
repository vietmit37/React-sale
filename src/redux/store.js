import { combineReducers, configureStore } from "@reduxjs/toolkit";
import testReducer from "./test/testSlice";
import authReducer from "./auth/authSlice";
import adminReducer from "./admin/adminSlice";
import bookReducer from "./book/bookSlice";
import orderReducer from "./order/orderSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // if you do not want to persist this part of the state
  blacklist: ["auth", "admin", "book"],
};

const reducer = combineReducers({
  test: testReducer,
  auth: authReducer,
  admin: adminReducer,
  book: bookReducer,
  order: orderReducer,
});
// this ensures your redux state is saved to persisted storage whenever it changes
// we pass this to the store
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

let persistor = persistStore(store);

export { store, persistor };
// export const store = configureStore({
//   reducer: {
//     test: testReducer,
//     auth: authReducer,
//     admin: adminReducer,
//     book: bookReducer,
//   },
// });
