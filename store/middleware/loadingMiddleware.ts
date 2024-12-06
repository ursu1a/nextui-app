import { Middleware } from "@reduxjs/toolkit";
import { setLoading } from "../slices/appSlice";
import { debounceDispatch } from "@/utils/functions";

export const loadingMiddleware: Middleware = (store) => {
  const debounce = debounceDispatch(store.dispatch);

  return (next) => (action: any) => {
    // Check the action type is "authSlice"
    if (action.type.startsWith("auth/")) {
      if (action.type.endsWith("/pending")) {
        debounce(setLoading(true));
      } else if (
        action.type.endsWith("/fulfilled") ||
        action.type.endsWith("/rejected")
      ) {
        debounce(setLoading(false));
      }
    }

    return next(action);
  };
};