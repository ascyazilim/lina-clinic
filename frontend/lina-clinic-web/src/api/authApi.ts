import { apiClient, type ApiResponse } from "./client";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const authApi = {
  async login(payload: LoginRequest) {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/api/auth/login",
      payload,
    );

    return response.data.data;
  },
};
