import { configureStore } from "@reduxjs/toolkit";
import { authreducers } from "./authReducers";
import { expenseReducers } from "./expenseReducers";

const reduxstore = configureStore({
  reducer: {
    auth: authreducers.reducer,
    expense: expenseReducers.reducer,
  },
});
export default reduxstore;
