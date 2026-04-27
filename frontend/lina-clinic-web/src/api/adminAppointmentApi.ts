import { apiClient, type ApiResponse } from "./client";
import type {
  AdminAppointment,
  AdminAppointmentFilters,
} from "../types/appointment";

export const adminAppointmentApi = {
  async getAppointments(filters: AdminAppointmentFilters = {}) {
    const response = await apiClient.get<ApiResponse<AdminAppointment[]>>(
      "/api/admin/appointments",
      {
        params: filters,
      },
    );

    return response.data.data ?? [];
  },

  async getAppointmentById(id: number) {
    const response = await apiClient.get<ApiResponse<AdminAppointment>>(
      `/api/admin/appointments/${id}`,
    );

    return response.data.data;
  },

  async confirmAppointment(id: number) {
    const response = await apiClient.patch<ApiResponse<AdminAppointment>>(
      `/api/admin/appointments/${id}/confirm`,
    );

    return response.data.data;
  },

  async cancelAppointment(id: number) {
    const response = await apiClient.patch<ApiResponse<AdminAppointment>>(
      `/api/admin/appointments/${id}/cancel`,
    );

    return response.data.data;
  },

  async completeAppointment(id: number) {
    const response = await apiClient.patch<ApiResponse<AdminAppointment>>(
      `/api/admin/appointments/${id}/complete`,
    );

    return response.data.data;
  },
};

