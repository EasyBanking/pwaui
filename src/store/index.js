import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import themeSlice from "./slices/theme";

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
  },
  preloadedState: {
    auth: {
      isLoggedIn: false,
      user: null,
    },
    theme: {
      leftbar: window.outerWidth > 960,
      rightbar: window.outerWidth > 960,
    },
  },
  devTools: process.env.NODE_ENV === "development",
});

export default store;
