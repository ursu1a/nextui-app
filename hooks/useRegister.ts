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
    try {
      setIsLoading(true);
      const response = await apiClient.post("/api/register", userData);
      setIsLoading(false);
      return { success: true, message: "Register successfully" };
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        message: `Register error: ${error}}`,
      };
    }
  };

  return { signup, isLoading };
};
