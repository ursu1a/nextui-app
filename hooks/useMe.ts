import apiClient from "@/api/apiClient";
import { useAppDispatch } from "./reduxHooks";
import { setUser } from "@/store/slices/authSlice";

export const useMe = () => {
  const dispatch = useAppDispatch();

  const getMe = async (): Promise<any> => {
    try {
      const response = await apiClient.get("/api/me");
      dispatch(setUser(response.data));
      return response.data;
    } catch (err) {
      return err;
    }
  };

  return getMe;
};
