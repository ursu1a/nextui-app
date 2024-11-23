import { useState } from "react";
import { useAppDispatch } from "./reduxHooks";
import { setAuth } from "../store/slices/authSlice";
import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (
    credentials: LoginCredentials,
    rememberMe: boolean
  ): Promise<ApiResponse> => {
    try {
      setIsLoading(true);
      const response = await apiClient.post("/api/login", credentials);
      const { access_token: token, refresh_token } = response.data;
      dispatch(setAuth({ token }));
      
      setIsLoading(false);
      if (rememberMe) {
        localStorage.setItem("authToken", token);
      }
      return { success: true, message: "Login successful" };
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        message: `Login error: ${error}}`,
      };
    }
  };

  return { login, isLoading };
};
