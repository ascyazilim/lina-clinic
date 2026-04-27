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

export type AuthSession = LoginResponse;

export const AUTH_STORAGE_KEY = "lina-clinic-auth";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function setAuth(session: AuthSession) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function getAuth(): AuthSession | null {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<AuthSession>;

    if (
      typeof parsedValue.accessToken !== "string" ||
      typeof parsedValue.username !== "string" ||
      typeof parsedValue.fullName !== "string" ||
      typeof parsedValue.role !== "string"
    ) {
      clearAuth();
      return null;
    }

    return {
      accessToken: parsedValue.accessToken,
      tokenType: parsedValue.tokenType === "Bearer" ? "Bearer" : "Bearer",
      username: parsedValue.username,
      fullName: parsedValue.fullName,
      role: parsedValue.role as UserRole,
    };
  } catch {
    clearAuth();
    return null;
  }
}

export function getToken() {
  return getAuth()?.accessToken ?? null;
}

export function clearAuth() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}
