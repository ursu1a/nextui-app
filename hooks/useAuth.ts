// This hook returns user information and authentication state
import { debounceDispatch } from "@/utils/functions";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import apiClient, { errorMessage } from "@/api/apiClient";
import { setLoading } from "@/store/slices/appSlice";
import { ApiResponse } from "@/types";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const debounce = debounceDispatch(dispatch);
  
  const { token, user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const verifyEmail = async (token: string): Promise<ApiResponse> => {
    try {
      dispatch(setLoading(true));
      await apiClient.get("/api/verify-email", { params: { token } });
      return { success: true, message: "Email is verified successfully" };
    } catch (error) {
      return { success: false, message: errorMessage(error)};
    } finally {
      debounce(setLoading(false));
    }
  };

  return { token, user, isAuthenticated, verifyEmail };
};
