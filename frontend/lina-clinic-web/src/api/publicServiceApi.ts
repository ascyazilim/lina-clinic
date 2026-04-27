import { apiClient, type ApiResponse } from "./client";
import type { ServiceDetail, ServiceSummary } from "../types/service";

export const publicServiceApi = {
  async getServices() {
    const response =
      await apiClient.get<ApiResponse<ServiceSummary[]>>("/api/public/services");

    return response.data.data ?? [];
  },

  async getServiceBySlug(slug: string) {
    const response = await apiClient.get<ApiResponse<ServiceDetail>>(
      `/api/public/services/${slug}`,
    );

    return response.data.data;
  },
};

