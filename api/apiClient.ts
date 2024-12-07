import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const errorMessage = (error: AxiosError | any) => error?.response ? error.response.data : error;

export default apiClient;
