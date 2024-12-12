import { useAppSelector } from "./reduxHooks";
import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types";
import { useApiRequest } from "./useApiRequest";

// This hook returns user information and authentication state
export const useAuth = () => {
  const { handleApiRequest } = useApiRequest({showGlobalLoader: true});

  const { token, user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const verifyEmail = (token: string): Promise<ApiResponse> =>
    handleApiRequest(
      async () => {
        await apiClient.get("/api/verify-email", { params: { token } });
      },
      "Email verified successfully",
    );

  return {
    token,
    user,
    isAuthenticated,
    verifyEmail,
  };
};
