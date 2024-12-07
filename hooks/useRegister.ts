import { useState } from "react";
import apiClient, { errorMessage } from "@/api/apiClient";
import { ApiResponse } from "@/types";
import { AxiosError } from "axios";

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
        message: `Register error: ${errorMessage(error)}`,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};
