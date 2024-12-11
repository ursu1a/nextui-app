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
    const response = await apiClient.post("/api/auth/refresh");
    if (response.status === 200) {
      return response.data.access_token;
    }
    return null;
  } catch (error) {
    return null;
  }
};
