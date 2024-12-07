import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import { loadingMiddleware } from "./middleware/loadingMiddleware";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingMiddleware),
});

// Cast RootState and AppDispatch for using in hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
