export type AppointmentStatus =
  | "REQUESTED"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW";

export interface AvailableSlot {
  date: string;
  time: string;
}

export interface AppointmentCreateRequest {
  firstName: string;
  lastName: string;
  phone: string;
  serviceId: number;
  date: string;
  time: string;
  kvkkApproved: boolean;
  note?: string;
}

export interface AppointmentCreatedResponse {
  id: number;
  status: AppointmentStatus;
  treatmentServiceId: number;
  treatmentServiceName: string;
  appointmentStart: string;
  appointmentEnd: string;
}

export interface AdminAppointmentTreatment {
  id: number;
  name: string;
  slug: string;
}

export interface AdminAppointmentStaff {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
}

export interface AdminAppointment {
  id: number;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  treatmentService: AdminAppointmentTreatment;
  staffMember: AdminAppointmentStaff;
  appointmentStart: string;
  appointmentEnd: string;
  status: AppointmentStatus;
  kvkkApproved: boolean;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAppointmentFilters {
  status?: AppointmentStatus;
  date?: string;
  serviceId?: number;
  staffId?: number;
}

