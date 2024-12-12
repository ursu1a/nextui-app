import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types";
import { useApiRequest } from "./useApiRequest";

interface NewUser {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const { isLoading, handleApiRequest } = useApiRequest({});

  const signup = (userData: NewUser): Promise<ApiResponse> =>
    handleApiRequest(async () => {
      await apiClient.post("/api/register", userData);
    }, "Register successfully");

  return { signup, isLoading };
};
