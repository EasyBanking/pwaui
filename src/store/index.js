import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  preloadedState: {},
  devTools: process.env.NODE_ENV === "development",
});

export default store;
