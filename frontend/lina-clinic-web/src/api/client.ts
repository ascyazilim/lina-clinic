import axios, { AxiosHeaders } from "axios";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: unknown;
  timestamp: string;
}

export const AUTH_TOKEN_STORAGE_KEY = "lina-clinic-access-token";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  if (token) {
    const headers = AxiosHeaders.from(config.headers);
    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
  }

  return config;
});
