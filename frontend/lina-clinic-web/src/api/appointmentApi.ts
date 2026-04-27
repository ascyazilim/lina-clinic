import { apiClient, type ApiResponse } from "./client";
import type {
  AppointmentCreateRequest,
  AppointmentCreatedResponse,
  AvailableSlot,
} from "../types/appointment";

export const appointmentApi = {
  async getAvailableSlots(serviceId: number, date: string) {
    const response = await apiClient.get<ApiResponse<AvailableSlot[]>>(
      "/api/public/available-slots",
      {
        params: { serviceId, date },
      },
    );

    return response.data.data ?? [];
  },

  async createAppointment(payload: AppointmentCreateRequest) {
    const response = await apiClient.post<ApiResponse<AppointmentCreatedResponse>>(
      "/api/public/appointments",
      payload,
    );

    return response.data.data;
  },
};

