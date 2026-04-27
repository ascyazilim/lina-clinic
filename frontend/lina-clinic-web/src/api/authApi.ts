import { AUTH_TOKEN_STORAGE_KEY, apiClient, type ApiResponse } from "./client";
import type { LoginRequest, LoginResponse } from "../types/auth";

export const authApi = {
  async login(payload: LoginRequest) {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/api/auth/login",
      payload,
    );

    return response.data.data;
  },

  saveToken(token: string) {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  },

  getToken() {
    return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  },

  clearToken() {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  },
};

