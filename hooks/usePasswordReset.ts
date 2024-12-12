import { ApiResponse } from "@/types";
import apiClient from "@/api/apiClient";
import { useApiRequest } from "./useApiRequest";

interface RequestedUser {
  token: string;
  password: string;
}

export const usePasswordReset = () => {
  const { isLoading, handleApiRequest } = useApiRequest({});

  const passwordReset = (email: string): Promise<ApiResponse> =>
    handleApiRequest(async () => {
      await apiClient.post("/api/request-reset-password", { email });
    }, "Password reset instruction is sent by email");

  const passwordUpdate = (requestedUser: RequestedUser): Promise<ApiResponse> =>
    handleApiRequest(async () => {
      await apiClient.post("/api/update-password", requestedUser);
    }, "Password updated successfully");

  return { isLoading, passwordReset, passwordUpdate };
};
