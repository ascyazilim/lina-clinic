import { useEffect, useMemo, useState } from "react";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { adminAppointmentApi } from "../api/adminAppointmentApi";
import { getApiErrorMessage } from "../api/client";
import { AdminStatusChip, getAppointmentStatusMeta } from "../components/admin/AdminStatusChip";
import type { AdminAppointment, AppointmentStatus } from "../types/appointment";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function isToday(value: string) {
  const currentDate = new Date();
  const candidateDate = new Date(value);

  return (
    currentDate.getFullYear() === candidateDate.getFullYear() &&
    currentDate.getMonth() === candidateDate.getMonth() &&
    currentDate.getDate() === candidateDate.getDate()
  );
}

interface DashboardStatCardProps {
  title: string;
  value: number;
  status?: AppointmentStatus;
}

function DashboardStatCard({ title, value, status }: DashboardStatCardProps) {
  const meta = status ? getAppointmentStatusMeta(status) : null;

  return (
    <Paper sx={{ p: 2.5, borderRadius: "20px", height: "100%" }}>
      <Stack spacing={1.4}>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h3" sx={{ lineHeight: 1 }}>
          {value}
        </Typography>
        {meta ? (
          <Typography variant="body2" color="text.secondary">
            Durum: {meta.label}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Tum randevu kayitlari dahil edilir
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}

interface AppointmentListCardProps {
  title: string;
  description: string;
  appointments: AdminAppointment[];
  emptyMessage: string;
}

function AppointmentListCard({
  title,
  description,
  appointments,
  emptyMessage,
}: AppointmentListCardProps) {
  return (
    <Paper sx={{ p: { xs: 2.5, md: 3 }, borderRadius: "22px", height: "100%" }}>
      <Stack spacing={2.2}>
        <Box>
          <Typography variant="h5">{title}</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.8 }}>
            {description}
          </Typography>
        </Box>

        {appointments.length === 0 ? (
          <Alert severity="info" sx={{ borderRadius: "16px" }}>
            {emptyMessage}
          </Alert>
        ) : (
          <Stack spacing={1.5}>
            {appointments.map((appointment) => (
              <Paper
                key={appointment.id}
                variant="outlined"
                sx={{
                  p: 1.75,
                  borderRadius: "16px",
                  backgroundColor: "rgba(255,255,255,0.72)",
                }}
              >
                <Stack spacing={1}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                      {appointment.customerFirstName} {appointment.customerLastName}
                    </Typography>
                    <AdminStatusChip status={appointment.status} />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {appointment.treatmentService.name} / {appointment.staffMember.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(appointment.appointmentStart)} -{" "}
                    {formatTime(appointment.appointmentStart)}
                  </Typography>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

export function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadAppointments() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const data = await adminAppointmentApi.getAppointments();

        if (!active) {
          return;
        }

        setAppointments(data);
      } catch (error) {
        if (!active) {
          return;
        }

        setErrorMessage(
          getApiErrorMessage(error, "Dashboard verileri alinirken bir sorun olustu."),
        );
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadAppointments();

    return () => {
      active = false;
    };
  }, []);

  const dashboardStats = useMemo(
    () => ({
      total: appointments.length,
      requested: appointments.filter((item) => item.status === "REQUESTED").length,
      confirmed: appointments.filter((item) => item.status === "CONFIRMED").length,
      completed: appointments.filter((item) => item.status === "COMPLETED").length,
      cancelled: appointments.filter((item) => item.status === "CANCELLED").length,
    }),
    [appointments],
  );

  const recentAppointments = useMemo(
    () =>
      [...appointments]
        .sort(
          (left, right) =>
            new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
        )
        .slice(0, 5),
    [appointments],
  );

  const todaysAppointments = useMemo(
    () =>
      appointments
        .filter((item) => isToday(item.appointmentStart))
        .sort(
          (left, right) =>
            new Date(left.appointmentStart).getTime() -
            new Date(right.appointmentStart).getTime(),
        )
        .slice(0, 6),
    [appointments],
  );

  return (
    <Stack spacing={3.5}>
      <Paper
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: "24px",
          background: (theme) => theme.customGradients.card,
        }}
      >
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={2.5}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", lg: "center" }}
        >
          <Box>
            <Typography variant="overline" color="secondary.main">
              Dashboard
            </Typography>
            <Typography variant="h3" sx={{ mt: 0.7 }}>
              Randevu durumlarini tek bakista izleyin
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1.1, maxWidth: 760 }}>
              Bekleyen, onaylanan, tamamlanan ve iptal edilen randevulari ayni panel
              uzerinde takip edebilir, detayli listeye tek tikla gecis yapabilirsiniz.
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/admin/randevular"
            variant="contained"
            color="primary"
            endIcon={<ArrowOutwardRoundedIcon />}
          >
            Randevulara Git
          </Button>
        </Stack>
      </Paper>

      {errorMessage ? (
        <Alert severity="error" sx={{ borderRadius: "18px" }}>
          {errorMessage}
        </Alert>
      ) : null}

      {isLoading ? (
        <Paper
          sx={{
            p: 5,
            borderRadius: "22px",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Stack spacing={1.4} alignItems="center">
            <CircularProgress color="secondary" />
            <Typography color="text.secondary">Dashboard verileri yukleniyor...</Typography>
          </Stack>
        </Paper>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                xl: "repeat(5, minmax(0, 1fr))",
              },
            }}
          >
            <DashboardStatCard title="Toplam randevu" value={dashboardStats.total} />
            <DashboardStatCard
              title="Bekleyen randevu"
              value={dashboardStats.requested}
              status="REQUESTED"
            />
            <DashboardStatCard
              title="Onaylanan randevu"
              value={dashboardStats.confirmed}
              status="CONFIRMED"
            />
            <DashboardStatCard
              title="Tamamlanan randevu"
              value={dashboardStats.completed}
              status="COMPLETED"
            />
            <DashboardStatCard
              title="Iptal edilen randevu"
              value={dashboardStats.cancelled}
              status="CANCELLED"
            />
          </Box>

          <Grid container spacing={2.5}>
            <Grid item xs={12} lg={7}>
              <AppointmentListCard
                title="Son randevular"
                description="Olusturulma zamanina gore en guncel kayitlar listelenir."
                appointments={recentAppointments}
                emptyMessage="Henuz gosterilecek randevu kaydi bulunmuyor."
              />
            </Grid>
            <Grid item xs={12} lg={5}>
              <AppointmentListCard
                title="Bugunku randevular"
                description="Bugun icin planlanan randevulari hizlica takip edin."
                appointments={todaysAppointments}
                emptyMessage="Bugun icin planlanmis randevu bulunmuyor."
              />
            </Grid>
          </Grid>
        </>
      )}
    </Stack>
  );
}
