import apiClient from "@/api/apiClient";
import { useAppDispatch } from "./reduxHooks";
import { clearAuth, setAuth, setUser } from "@/store/slices/authSlice";

export const useMe = () => {
  const dispatch = useAppDispatch();

  const getMe = async (): Promise<Record<string, any> | null> => {
    try {
      const response = await apiClient.get("/api/me");
      dispatch(setUser(response.data));
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (err) {
      dispatch(clearAuth());
      return null;
    }
  };

  return getMe;
};
