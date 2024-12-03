import { useState } from "react";
import { useAppDispatch } from "./reduxHooks";
import { ApiResponse } from "@/types";
import apiClient from "@/api/apiClient";

interface RequestedUser {
   token: string;
   password: string;
 }

export const usePasswordReset = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const passwordReset = async (email: string): Promise<ApiResponse> => {
    try {
      setIsLoading(true);
      await apiClient.post("/api/request-reset-password", {email});

      setIsLoading(false);
      return {
        success: true,
        message: "Password reset instructions were sent",
      };
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        message: `An error occurred while resetting the password ${error}`,
      };
    }
  };

  const passwordUpdate = async (requestedUser: RequestedUser) => {
   try {
      setIsLoading(true);
      await apiClient.post("/api/update-password", requestedUser);

      setIsLoading(false);
      return {
        success: true,
        message: "Password updated successfully",
      };
   } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        message: `An error occurred while updating the password ${error}`,
      };
   }
  };

  return { isLoading, passwordReset, passwordUpdate };
};
