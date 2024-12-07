import apiClient, { errorMessage } from "@/api/apiClient";
import { ApiResponse } from "@/types";
import { useState } from "react";
import { useMe } from "./useMe";
import { useLogout } from "./useLogout";

interface UpdateUser {
   name: string;
   email: string;
}

export const useAccount = () => {
  const [isLoading, setLoading] = useState(false);
  const getMe = useMe();
  const logout = useLogout();
  
  const updateProfile = async (userData: UpdateUser): Promise<ApiResponse> => {
   setLoading(true);
   try {
      await apiClient.put('/api/profile/update', userData);
      getMe();
      return {
         success: true,
         message: "User updated successfully"
      }
   } catch (error) {
      return {
         success: false,
         message: `Error updating user: ${errorMessage(error)}`,
      }
   } finally {
      setLoading(false);
   }
  };

  const deleteAccount = async (): Promise<ApiResponse> => {
   setLoading(true);
   try {
      await apiClient.delete('/api/account/delete');
      logout();
      return {
         success: true,
         message: "User was deleted"
      }
   } catch (error) {
      return {
         success: false,
         message: `Error deleting user: ${errorMessage(error)}`,
      }
   } finally {
      setLoading(false);
   }
  };

  return { isLoading, updateProfile, deleteAccount };
};
