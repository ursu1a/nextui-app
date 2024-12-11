import { useAppDispatch } from "./reduxHooks";
import { clearAuth } from "../store/slices/authSlice";
import { clearData } from "@/store/slices/userSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(clearAuth());
    dispatch(clearData());
    localStorage.removeItem("authToken");
  };

  return logout;
};
