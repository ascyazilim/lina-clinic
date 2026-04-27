import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "../components/admin/AdminLayout";
import { ProtectedAdminRoute } from "../components/admin/ProtectedAdminRoute";
import { PublicLayout } from "../components/layout/PublicLayout";
import { AboutPage } from "../pages/AboutPage";
import { AdminAppointmentsPage } from "../pages/AdminAppointmentsPage";
import { AdminDashboardPage } from "../pages/AdminDashboardPage";
import { AdminLoginPage } from "../pages/AdminLoginPage";
import { AppointmentPage } from "../pages/AppointmentPage";
import { ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/HomePage";
import { KvkkPage } from "../pages/KvkkPage";
import { ServiceDetailPage } from "../pages/ServiceDetailPage";
import { ServicesPage } from "../pages/ServicesPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/hizmetler" element={<ServicesPage />} />
          <Route path="/hizmetler/:slug" element={<ServiceDetailPage />} />
          <Route path="/randevu" element={<AppointmentPage />} />
          <Route path="/hakkimizda" element={<AboutPage />} />
          <Route path="/iletisim" element={<ContactPage />} />
          <Route path="/kvkk" element={<KvkkPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="randevular" element={<AdminAppointmentsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
