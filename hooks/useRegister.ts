import { useState } from "react";
import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types";

interface NewUser {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (userData: NewUser): Promise<ApiResponse> => {
    setIsLoading(true);
    try {
      await apiClient.post("/api/register", userData);
      return { success: true, message: "Register successfully" };
    } catch (error) {
      return {
        success: false,
        message: `Register error: ${error}}`,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string): Promise<ApiResponse> => {
    try {
      setIsLoading(true);
      await apiClient.get("/api/verify-email", { params: { token } });
      return { success: true, message: "Email is verified successfully" };
    } catch (error) {
      return { success: false, message: "Email verification error" };
    } finally {
      setIsLoading(true);
    }
  };

  return { signup, verifyEmail, isLoading };
};
