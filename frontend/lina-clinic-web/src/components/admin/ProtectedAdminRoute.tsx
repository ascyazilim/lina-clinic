import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../types/auth";

export function ProtectedAdminRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
