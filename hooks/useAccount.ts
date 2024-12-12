import apiClient from "@/api/apiClient";
import { ApiResponse } from "@/types";
import { useMe } from "./useMe";
import { useLogout } from "./useLogout";
import { useApiRequest } from "./useApiRequest";

interface UpdateUser {
  name: string;
  email: string;
}

export const useAccount = () => {
  const getMe = useMe();
  const logout = useLogout();
  const { isLoading, handleApiRequest } = useApiRequest({});

  const updateProfile = (userData: UpdateUser): Promise<ApiResponse> =>
    handleApiRequest(async () => {
      await apiClient.put("/api/profile/update", userData);
      getMe();
    }, "User updated successfully");

  const deleteAccount = (): Promise<ApiResponse> =>
    handleApiRequest(async () => {
      await apiClient.delete("/api/account/delete");
      logout();
    }, "User deleted successfully");

  return { isLoading, updateProfile, deleteAccount };
};
