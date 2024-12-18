import apiClient from "@/api/apiClient";
import { useAppDispatch } from "./reduxHooks";
import { clearAuth, setUser } from "@/store/slices/authSlice";

export const useMe = () => {
  const dispatch = useAppDispatch();

  const getMe = async (): Promise<Record<string, any> | null> => {
    try {
      const response = await apiClient.get("/api/me");
      if (response.status === 200) {
        dispatch(setUser(response.data));
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
