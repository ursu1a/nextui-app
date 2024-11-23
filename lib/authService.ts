import { AxiosInstance } from "axios";
import { EnhancedStore } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import apiClient from "@/api/apiClient";

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await apiClient.get("/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await apiClient.post("/api/auth/refresh", {});
    if (response.status === 200) {
      return response.data.access_token;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const openOAuthWindow = (
  url: string,
  name: string,
  width: number,
  height: number
): Window | null => {
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  return window.open(
    url,
    name,
    `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars,status`
  );
};

// This method is used for include/exclude interceptor with authentication header
// to each apiClient instance call when it's needed by authorization state
let interceptorId: number | null = null;

export const setupAxiosInterceptors = (store: EnhancedStore): void => {
  const addTokenInterceptor = (
    axiosInstance: AxiosInstance,
    token: string
  ): number =>
    axiosInstance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

  store.subscribe(() => {
    const state: RootState = store.getState();
    const token = state.auth.token;

    if (interceptorId !== null) {
      apiClient.interceptors.request.eject(interceptorId);
    }

    if (token) {
      interceptorId = addTokenInterceptor(apiClient, token);
    } else {
      interceptorId = null;
    }
  });
};
