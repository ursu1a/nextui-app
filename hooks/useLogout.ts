import { useAppDispatch } from "./reduxHooks";
import { clearAuth } from "../store/slices/authSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  };

  return logout;
};
