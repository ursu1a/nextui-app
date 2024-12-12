import { useAppDispatch } from "./reduxHooks";
import { setAuth } from "../store/slices/authSlice";
import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types";
import { useApiRequest } from "./useApiRequest";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { isLoading, handleApiRequest } = useApiRequest({});

  const login = (
    credentials: LoginCredentials,
    rememberMe: boolean
  ): Promise<ApiResponse> =>
    handleApiRequest(async () => {
      const response = await apiClient.post("/api/login", credentials);
      const { access_token: token } = response.data;
      dispatch(setAuth({ token }));

      if (rememberMe) {
        localStorage.setItem("authToken", token);
      }
    }, "Login successfully");

  return { login, isLoading };
};
