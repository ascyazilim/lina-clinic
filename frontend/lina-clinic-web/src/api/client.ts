import axios, { AxiosHeaders } from "axios";
import { clearAuth, getToken } from "../types/auth";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: unknown;
  timestamp: string;
}

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const configuredProxyTarget = import.meta.env.VITE_API_PROXY_TARGET?.trim();
const defaultApiTarget = "http://localhost:8081";
const normalizedConfiguredBaseUrl = configuredApiBaseUrl?.replace(/\/+$/, "");
const shouldUseViteProxy =
  import.meta.env.DEV &&
  (!normalizedConfiguredBaseUrl ||
    normalizedConfiguredBaseUrl === defaultApiTarget);

export const apiTargetUrl =
  configuredProxyTarget || normalizedConfiguredBaseUrl || defaultApiTarget;

export const apiClient = axios.create({
  // Public/admin API helpers already call paths that start with `/api/...`.
  // In Vite dev mode we therefore keep the axios base empty and let the dev proxy
  // forward those existing `/api` requests to the backend target.
  baseURL: shouldUseViteProxy ? "" : apiTargetUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    const headers = AxiosHeaders.from(config.headers);
    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const responseStatus = error.response?.status;
    const requestUrl = error.config?.url ?? "";
    const isLoginRequest = requestUrl.includes("/api/auth/login");
    const isAdminRequest = requestUrl.includes("/api/admin/");

    if (
      responseStatus === 401 &&
      !isLoginRequest &&
      isAdminRequest &&
      typeof window !== "undefined"
    ) {
      clearAuth();

      if (window.location.pathname !== "/admin/login") {
        window.location.replace("/admin/login");
      }
    }

    return Promise.reject(error);
  },
);

export function getApiErrorMessage(error: unknown, fallback = "Bir hata olustu.") {
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    if (error.code === "ERR_NETWORK" || !error.response) {
      return `API'ye ulasilamadi. Backend'in ${apiTargetUrl} adresinde calistigini kontrol edin.`;
    }

    const message = error.response?.data?.message;
    const errors = error.response?.data?.errors;

    if (errors && typeof errors === "object") {
      const firstError = Object.values(errors as Record<string, unknown>).find(
        (value) => typeof value === "string" && value.trim().length > 0,
      );

      if (typeof firstError === "string") {
        return firstError;
      }
    }

    if (typeof message === "string" && message.trim().length > 0) {
      return message;
    }
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
}
