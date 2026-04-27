import { apiClient, type ApiResponse } from "./client";
import type {
  AppointmentFormPayload,
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

    return (response.data.data ?? []).map((slot) => ({
      ...slot,
      available: true,
    }));
  },

  async createAppointment(payload: AppointmentFormPayload) {
    const requestPayload: AppointmentCreateRequest = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      serviceId: payload.serviceId,
      date: payload.appointmentDate,
      time: payload.startTime,
      kvkkApproved: payload.kvkkApproved,
      note: payload.note,
    };

    const response = await apiClient.post<ApiResponse<AppointmentCreatedResponse>>(
      "/api/public/appointments",
      requestPayload,
    );

    return response.data.data;
  },
};
