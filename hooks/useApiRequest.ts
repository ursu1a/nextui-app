import { useRef, useState } from "react";
import { errorMessage } from "@/api/apiClient";
import { ApiResponse } from "@/types";
import { debounce } from "lodash";
import { useAppDispatch } from "./reduxHooks";
import { setAppLoading } from "@/store/slices/appSlice";

interface UseApiRequestOptions {
  delay?: number;
  showGlobalLoader?: boolean;
}

export const useApiRequest = ({
  delay = 300,
  showGlobalLoader = false,
}: UseApiRequestOptions) => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const debounceSetLoading = useRef(
    debounce(
      (loading: boolean) => {
        setLoading(loading);
        if (showGlobalLoader) {
          dispatch(setAppLoading(isLoading));
        }
      },
      delay,
      {
        leading: true,
        trailing: true,
      }
    )
  ).current;

  const handleApiRequest = async (
    apiCall: () => Promise<void>,
    successMessage: string
  ): Promise<ApiResponse> => {
    debounceSetLoading(true);
    try {
      await apiCall();
      return {
        success: true,
        message: successMessage,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error: ${errorMessage(error)}`,
      };
    } finally {
      debounceSetLoading(false);
    }
  };

  return { isLoading, handleApiRequest };
};
