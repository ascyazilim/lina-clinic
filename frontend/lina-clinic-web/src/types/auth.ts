export type UserRole = "ADMIN" | "RECEPTIONIST" | "STAFF";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: "Bearer";
  username: string;
  fullName: string;
  role: UserRole;
}

