import { RootState } from "@/store/store";
import { EnhancedStore } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosInstance } from "axios";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const errorMessage = (error: AxiosError | any) =>
  error?.response ? error.response.data : error;

/* This method is used for include/exclude interceptor with authentication header to each apiClient instance call */
export const setupAxiosInterceptors = (store: EnhancedStore): void => {
  let interceptorId: number | null = null;

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

export default apiClient;
