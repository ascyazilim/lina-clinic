import { useCallback, useEffect, useMemo, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { adminAppointmentApi } from "../api/adminAppointmentApi";
import { getApiErrorMessage } from "../api/client";
import { AdminStatusChip, getAppointmentStatusMeta } from "../components/admin/AdminStatusChip";
import type { AdminAppointment, AppointmentStatus } from "../types/appointment";

type AppointmentActionType = "confirm" | "cancel" | "complete";

interface ActionDialogState {
  appointment: AdminAppointment;
  type: AppointmentActionType;
}

interface AppointmentDetailState {
  open: boolean;
  appointmentId: number | null;
  appointment: AdminAppointment | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const statusOptions: Array<{ value: AppointmentStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "Tum durumlar" },
  { value: "REQUESTED", label: "Bekliyor" },
  { value: "CONFIRMED", label: "Onaylandi" },
  { value: "CANCELLED", label: "Iptal Edildi" },
  { value: "COMPLETED", label: "Tamamlandi" },
  { value: "NO_SHOW", label: "Gelmedi" },
];

const actionMeta: Record<
  AppointmentActionType,
  { label: string; successMessage: string; color: "success" | "error" | "info" }
> = {
  confirm: {
    label: "Onayla",
    successMessage: "Randevu onaylandi.",
    color: "success",
  },
  cancel: {
    label: "Iptal Et",
    successMessage: "Randevu iptal edildi.",
    color: "error",
  },
  complete: {
    label: "Tamamlandi Yap",
    successMessage: "Randevu tamamlandi olarak guncellendi.",
    color: "info",
  },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function toDateKey(value: string) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getAvailableActions(appointment: AdminAppointment) {
  if (appointment.status === "REQUESTED") {
    return ["confirm", "cancel"] as const;
  }

  if (appointment.status === "CONFIRMED") {
    return ["complete", "cancel"] as const;
  }

  return [] as const;
}

interface AppointmentActionButtonsProps {
  appointment: AdminAppointment;
  isProcessing: boolean;
  onOpenDetail: (appointment: AdminAppointment) => void;
  onRequestAction: (appointment: AdminAppointment, type: AppointmentActionType) => void;
}

function AppointmentActionButtons({
  appointment,
  isProcessing,
  onOpenDetail,
  onRequestAction,
}: AppointmentActionButtonsProps) {
  const actions = getAvailableActions(appointment);

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Button
        size="small"
        variant="outlined"
        startIcon={<InfoOutlinedIcon />}
        onClick={() => onOpenDetail(appointment)}
      >
        Detay
      </Button>

      {actions.map((action) => (
        <Button
          key={action}
          size="small"
          variant={action === "cancel" ? "outlined" : "contained"}
          color={actionMeta[action].color}
          disabled={isProcessing}
          startIcon={
            action === "confirm" ? (
              <CheckCircleRoundedIcon />
            ) : action === "complete" ? (
              <TaskAltRoundedIcon />
            ) : undefined
          }
          onClick={() => onRequestAction(appointment, action)}
        >
          {actionMeta[action].label}
        </Button>
      ))}
    </Stack>
  );
}

export function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "ALL">("ALL");
  const [dateFilter, setDateFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("ALL");

  const [actionDialog, setActionDialog] = useState<ActionDialogState | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  const [detailState, setDetailState] = useState<AppointmentDetailState>({
    open: false,
    appointmentId: null,
    appointment: null,
    isLoading: false,
    errorMessage: null,
  });

  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const loadAppointments = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await adminAppointmentApi.getAppointments();
      setAppointments(data);
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, "Randevu listesi alinirken bir sorun olustu."),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAppointments();
  }, [loadAppointments]);

  const serviceOptions = useMemo(() => {
    const options = new Map<number, string>();

    appointments.forEach((appointment) => {
      options.set(appointment.treatmentService.id, appointment.treatmentService.name);
    });

    return [...options.entries()]
      .map(([id, name]) => ({ id, name }))
      .sort((left, right) => left.name.localeCompare(right.name, "tr"));
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase("tr-TR");

    return appointments.filter((appointment) => {
      const customerFullName =
        `${appointment.customerFirstName} ${appointment.customerLastName}`.toLocaleLowerCase(
          "tr-TR",
        );
      const matchesSearch =
        !normalizedSearchTerm ||
        customerFullName.includes(normalizedSearchTerm) ||
        appointment.customerPhone.toLocaleLowerCase("tr-TR").includes(normalizedSearchTerm);
      const matchesStatus =
        statusFilter === "ALL" || appointment.status === statusFilter;
      const matchesDate =
        !dateFilter || toDateKey(appointment.appointmentStart) === dateFilter;
      const matchesService =
        serviceFilter === "ALL" ||
        appointment.treatmentService.id === Number(serviceFilter);

      return matchesSearch && matchesStatus && matchesDate && matchesService;
    });
  }, [appointments, dateFilter, searchTerm, serviceFilter, statusFilter]);

  const handleOpenDetail = async (appointment: AdminAppointment) => {
    setDetailState({
      open: true,
      appointmentId: appointment.id,
      appointment,
      isLoading: true,
      errorMessage: null,
    });

    try {
      const detail = await adminAppointmentApi.getAppointmentById(appointment.id);

      setDetailState({
        open: true,
        appointmentId: appointment.id,
        appointment: detail ?? appointment,
        isLoading: false,
        errorMessage: null,
      });
    } catch (error) {
      setDetailState({
        open: true,
        appointmentId: appointment.id,
        appointment,
        isLoading: false,
        errorMessage: getApiErrorMessage(
          error,
          "Randevu detayi alinirken bir sorun olustu.",
        ),
      });
    }
  };

  const handleCloseDetail = () => {
    setDetailState({
      open: false,
      appointmentId: null,
      appointment: null,
      isLoading: false,
      errorMessage: null,
    });
  };

  const handleConfirmAction = async () => {
    if (!actionDialog) {
      return;
    }

    try {
      setIsProcessingAction(true);

      let updatedAppointment: AdminAppointment | null = null;

      if (actionDialog.type === "confirm") {
        updatedAppointment =
          (await adminAppointmentApi.confirmAppointment(actionDialog.appointment.id)) ?? null;
      } else if (actionDialog.type === "cancel") {
        updatedAppointment =
          (await adminAppointmentApi.cancelAppointment(actionDialog.appointment.id)) ?? null;
      } else {
        updatedAppointment =
          (await adminAppointmentApi.completeAppointment(actionDialog.appointment.id)) ?? null;
      }

      await loadAppointments();

      if (
        updatedAppointment &&
        detailState.open &&
        detailState.appointmentId === updatedAppointment.id
      ) {
        setDetailState((current) => ({
          ...current,
          appointment: updatedAppointment,
        }));
      }

      setSnackbarState({
        open: true,
        severity: "success",
        message: actionMeta[actionDialog.type].successMessage,
      });
      setActionDialog(null);
    } catch (error) {
      setSnackbarState({
        open: true,
        severity: "error",
        message: getApiErrorMessage(
          error,
          "Randevu islemi sirasinda bir sorun olustu.",
        ),
      });
    } finally {
      setIsProcessingAction(false);
    }
  };

  return (
    <Stack spacing={3.5}>
      <Paper
        sx={{
          p: { xs: 2.5, md: 3 },
          borderRadius: "24px",
          background: (theme) => theme.customGradients.card,
        }}
      >
        <Stack spacing={1.1}>
          <Typography variant="overline" color="secondary.main">
            Admin Randevular
          </Typography>
          <Typography variant="h3">Randevu listesi ve durum yonetimi</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 820 }}>
            Listeyi durum, tarih ve hizmet bazinda daraltabilir; randevu detaylarini
            acip onay, iptal ve tamamlama akislarini yonetebilirsiniz.
          </Typography>
        </Stack>
      </Paper>

      <Paper sx={{ p: { xs: 2.5, md: 3 }, borderRadius: "22px" }}>
        <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2.25 }}>
          <FilterAltRoundedIcon color="secondary" />
          <Typography variant="h5">Filtreler</Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} xl={3}>
            <TextField
              fullWidth
              label="Arama"
              placeholder="Musteri adi veya telefon"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <TextField
              select
              fullWidth
              label="Durum"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as AppointmentStatus | "ALL")
              }
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <TextField
              fullWidth
              type="date"
              label="Tarih"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} xl={3}>
            <TextField
              select
              fullWidth
              label="Hizmet"
              value={serviceFilter}
              onChange={(event) => setServiceFilter(event.target.value)}
            >
              <MenuItem value="ALL">Tum hizmetler</MenuItem>
              {serviceOptions.map((service) => (
                <MenuItem key={service.id} value={String(service.id)}>
                  {service.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      {errorMessage ? (
        <Alert
          severity="error"
          sx={{ borderRadius: "18px" }}
          action={
            <Button color="inherit" size="small" onClick={() => void loadAppointments()}>
              Tekrar Dene
            </Button>
          }
        >
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
            <Typography color="text.secondary">Randevu listesi yukleniyor...</Typography>
          </Stack>
        </Paper>
      ) : filteredAppointments.length === 0 ? (
        <Paper
          sx={{
            p: 5,
            borderRadius: "22px",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
          }}
        >
          <Stack spacing={1.4} alignItems="center">
            <InfoOutlinedIcon color="secondary" sx={{ fontSize: 34 }} />
            <Typography variant="h5">Filtreye uygun randevu bulunamadi</Typography>
            <Typography color="text.secondary">
              Durum, tarih veya hizmet filtrelerini degistirerek listeyi yeniden
              deneyebilirsiniz.
            </Typography>
          </Stack>
        </Paper>
      ) : (
        <>
          <Stack spacing={2} sx={{ display: { xs: "flex", md: "none" } }}>
            {filteredAppointments.map((appointment) => (
              <Paper key={appointment.id} sx={{ p: 2.25, borderRadius: "20px" }}>
                <Stack spacing={1.5}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                        {appointment.customerFirstName} {appointment.customerLastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.customerPhone}
                      </Typography>
                    </Box>
                    <AdminStatusChip status={appointment.status} />
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    Hizmet: {appointment.treatmentService.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Personel: {appointment.staffMember.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(appointment.appointmentStart)} /{" "}
                    {formatTime(appointment.appointmentStart)}
                  </Typography>

                  <AppointmentActionButtons
                    appointment={appointment}
                    isProcessing={isProcessingAction}
                    onOpenDetail={handleOpenDetail}
                    onRequestAction={(targetAppointment, type) =>
                      setActionDialog({ appointment: targetAppointment, type })
                    }
                  />
                </Stack>
              </Paper>
            ))}
          </Stack>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "22px",
              overflowX: "auto",
              display: { xs: "none", md: "block" },
            }}
          >
            <Table sx={{ minWidth: 1100 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Musteri</TableCell>
                  <TableCell>Telefon</TableCell>
                  <TableCell>Hizmet</TableCell>
                  <TableCell>Personel / Uzman</TableCell>
                  <TableCell>Tarih</TableCell>
                  <TableCell>Saat</TableCell>
                  <TableCell>Durum</TableCell>
                  <TableCell>Islemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id} hover>
                    <TableCell sx={{ fontWeight: 700 }}>
                      {appointment.customerFirstName} {appointment.customerLastName}
                    </TableCell>
                    <TableCell>{appointment.customerPhone}</TableCell>
                    <TableCell>{appointment.treatmentService.name}</TableCell>
                    <TableCell>
                      {appointment.staffMember.fullName}
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        {appointment.staffMember.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{formatDate(appointment.appointmentStart)}</TableCell>
                    <TableCell>{formatTime(appointment.appointmentStart)}</TableCell>
                    <TableCell>
                      <AdminStatusChip status={appointment.status} />
                    </TableCell>
                    <TableCell sx={{ minWidth: 260 }}>
                      <AppointmentActionButtons
                        appointment={appointment}
                        isProcessing={isProcessingAction}
                        onOpenDetail={handleOpenDetail}
                        onRequestAction={(targetAppointment, type) =>
                          setActionDialog({ appointment: targetAppointment, type })
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <Dialog
        open={detailState.open}
        onClose={handleCloseDetail}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Randevu Detayi</DialogTitle>
        <DialogContent dividers>
          {detailState.isLoading ? (
            <Stack spacing={1.2} alignItems="center" sx={{ py: 4 }}>
              <CircularProgress color="secondary" />
              <Typography color="text.secondary">Randevu detayi yukleniyor...</Typography>
            </Stack>
          ) : detailState.appointment ? (
            <Grid container spacing={2}>
              {detailState.errorMessage ? (
                <Grid item xs={12}>
                  <Alert severity="warning" sx={{ borderRadius: "14px" }}>
                    {detailState.errorMessage}
                  </Alert>
                </Grid>
              ) : null}
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Musteri
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {detailState.appointment.customerFirstName}{" "}
                  {detailState.appointment.customerLastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Telefon
                </Typography>
                <Typography variant="body1">{detailState.appointment.customerPhone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Hizmet
                </Typography>
                <Typography variant="body1">{detailState.appointment.treatmentService.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Personel
                </Typography>
                <Typography variant="body1">
                  {detailState.appointment.staffMember.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {detailState.appointment.staffMember.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Tarih
                </Typography>
                <Typography variant="body1">
                  {formatDate(detailState.appointment.appointmentStart)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Saat
                </Typography>
                <Typography variant="body1">
                  {formatTime(detailState.appointment.appointmentStart)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Durum
                </Typography>
                <Box sx={{ mt: 0.7 }}>
                  <AdminStatusChip status={detailState.appointment.status} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="text.secondary">
                  Olusturulma Tarihi
                </Typography>
                <Typography variant="body1">
                  {formatDateTime(detailState.appointment.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Not
                </Typography>
                <Typography variant="body1">
                  {detailState.appointment.note?.trim() || "Not birakilmadi."}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Alert severity="info" sx={{ borderRadius: "14px" }}>
              Gosterilecek randevu detayi bulunamadi.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetail}>Kapat</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(actionDialog)}
        onClose={() => {
          if (!isProcessingAction) {
            setActionDialog(null);
          }
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          {actionDialog ? actionMeta[actionDialog.type].label : "Randevu Islemi"}
        </DialogTitle>
        <DialogContent dividers>
          {actionDialog ? (
            <Stack spacing={1.2}>
              <Typography>
                <strong>
                  {actionDialog.appointment.customerFirstName}{" "}
                  {actionDialog.appointment.customerLastName}
                </strong>{" "}
                icin olusturulan randevu kaydini{" "}
                <strong>{actionMeta[actionDialog.type].label.toLocaleLowerCase("tr-TR")}</strong>{" "}
                istiyor musunuz?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hizmet: {actionDialog.appointment.treatmentService.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tarih / Saat: {formatDate(actionDialog.appointment.appointmentStart)} /{" "}
                {formatTime(actionDialog.appointment.appointmentStart)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mevcut durum: {getAppointmentStatusMeta(actionDialog.appointment.status).label}
              </Typography>
            </Stack>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button disabled={isProcessingAction} onClick={() => setActionDialog(null)}>
            Vazgec
          </Button>
          <Button
            variant="contained"
            color={actionDialog ? actionMeta[actionDialog.type].color : "primary"}
            disabled={isProcessingAction}
            onClick={() => void handleConfirmAction()}
          >
            {isProcessingAction
              ? "Islem yapiliyor..."
              : actionDialog
                ? actionMeta[actionDialog.type].label
                : "Onayla"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3500}
        onClose={() => setSnackbarState((current) => ({ ...current, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbarState.severity}
          sx={{ width: "100%", borderRadius: "14px" }}
          onClose={() => setSnackbarState((current) => ({ ...current, open: false }))}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
