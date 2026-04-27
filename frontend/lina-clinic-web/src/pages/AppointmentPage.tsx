import { useEffect, useMemo, useState } from "react";
import type { Dayjs } from "dayjs";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Link as RouterLink } from "react-router-dom";
import { appointmentApi } from "../api/appointmentApi";
import { getApiErrorMessage } from "../api/client";
import { publicServiceApi } from "../api/publicServiceApi";
import { AppointmentInfoPanel } from "../components/appointment/AppointmentInfoPanel";
import { AvailableSlotSelector } from "../components/appointment/AvailableSlotSelector";
import type {
  AppointmentCreatedResponse,
  AppointmentFormPayload,
  AvailableSlot,
} from "../types/appointment";
import type { ServiceSummary } from "../types/service";

interface AppointmentFormState {
  firstName: string;
  lastName: string;
  phone: string;
  serviceId: string;
  appointmentDate: Dayjs | null;
  startTime: string;
  kvkkApproved: boolean;
  note: string;
}

interface AppointmentFormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  serviceId?: string;
  appointmentDate?: string;
  startTime?: string;
  kvkkApproved?: string;
}

const initialFormState: AppointmentFormState = {
  firstName: "",
  lastName: "",
  phone: "",
  serviceId: "",
  appointmentDate: null,
  startTime: "",
  kvkkApproved: false,
  note: "",
};

export function AppointmentPage() {
  const [services, setServices] = useState<ServiceSummary[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [serviceLoadError, setServiceLoadError] = useState<string | null>(null);

  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotMessage, setSlotMessage] = useState<string | null>(
    "Uygun saatleri gormek icin once hizmet ve tarih secin.",
  );

  const [formState, setFormState] = useState<AppointmentFormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<AppointmentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successSummary, setSuccessSummary] = useState<{
    appointment: AppointmentCreatedResponse;
    serviceName: string;
    date: string;
    time: string;
  } | null>(null);

  const selectedService = useMemo(
    () =>
      services.find((service) => service.id === Number(formState.serviceId)) ?? null,
    [services, formState.serviceId],
  );

  const hasSlotCriteria = Boolean(formState.serviceId && formState.appointmentDate);

  useEffect(() => {
    let active = true;

    async function loadServices() {
      try {
        setIsLoadingServices(true);
        setServiceLoadError(null);
        const data = await publicServiceApi.getServices();

        if (!active) {
          return;
        }

        setServices(data);
      } catch (error) {
        if (!active) {
          return;
        }

        setServiceLoadError(
          getApiErrorMessage(error, "Hizmet listesi alinirken bir sorun olustu."),
        );
      } finally {
        if (active) {
          setIsLoadingServices(false);
        }
      }
    }

    void loadServices();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadAvailableSlots() {
      if (!formState.serviceId || !formState.appointmentDate) {
        setAvailableSlots([]);
        setSlotMessage("Uygun saatleri gormek icin once hizmet ve tarih secin.");
        return;
      }

      try {
        setIsLoadingSlots(true);
        setSubmitError(null);

        const dateValue = formState.appointmentDate.format("YYYY-MM-DD");
        const slots = await appointmentApi.getAvailableSlots(
          Number(formState.serviceId),
          dateValue,
        );

        if (!active) {
          return;
        }

        setAvailableSlots(slots);

        if (slots.length === 0) {
          setSlotMessage("Secilen gun icin uygun saat bulunamadi.");
        } else {
          setSlotMessage(null);
        }
      } catch (error) {
        if (!active) {
          return;
        }

        setAvailableSlots([]);
        setSlotMessage(
          getApiErrorMessage(error, "Uygun saatler alinirken bir sorun olustu."),
        );
      } finally {
        if (active) {
          setIsLoadingSlots(false);
        }
      }
    }

    void loadAvailableSlots();

    return () => {
      active = false;
    };
  }, [formState.serviceId, formState.appointmentDate]);

  const updateField = <K extends keyof AppointmentFormState>(
    field: K,
    value: AppointmentFormState[K],
  ) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));

    setFormErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const resetSelectedTime = () => {
    setFormState((current) => ({
      ...current,
      startTime: "",
    }));
    setFormErrors((current) => ({
      ...current,
      startTime: undefined,
    }));
  };

  const handleServiceChange = (value: string) => {
    updateField("serviceId", value);
    resetSelectedTime();
    setAvailableSlots([]);
    setSlotMessage(
      value
        ? "Uygun saatler aliniyor..."
        : "Uygun saatleri gormek icin once hizmet ve tarih secin.",
    );
  };

  const handleDateChange = (value: Dayjs | null) => {
    updateField("appointmentDate", value);
    resetSelectedTime();
    setAvailableSlots([]);
    setSlotMessage(
      value
        ? "Uygun saatler aliniyor..."
        : "Uygun saatleri gormek icin once hizmet ve tarih secin.",
    );
  };

  const validateForm = (): boolean => {
    const nextErrors: AppointmentFormErrors = {};
    const phoneDigits = formState.phone.replace(/\D/g, "");

    if (!formState.firstName.trim()) {
      nextErrors.firstName = "Ad alani zorunludur.";
    }

    if (!formState.lastName.trim()) {
      nextErrors.lastName = "Soyad alani zorunludur.";
    }

    if (!formState.phone.trim()) {
      nextErrors.phone = "Telefon alani zorunludur.";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      nextErrors.phone = "Telefon numarasi gecerli gorunmuyor.";
    }

    if (!formState.serviceId) {
      nextErrors.serviceId = "Lutfen bir hizmet secin.";
    }

    if (!formState.appointmentDate) {
      nextErrors.appointmentDate = "Lutfen bir tarih secin.";
    }

    if (!formState.startTime) {
      nextErrors.startTime = "Randevu icin uygun bir saat secmelisiniz.";
    }

    if (!formState.kvkkApproved) {
      nextErrors.kvkkApproved = "Randevu talebi icin KVKK onayi gereklidir.";
    }

    setFormErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload: AppointmentFormPayload = {
      firstName: formState.firstName.trim(),
      lastName: formState.lastName.trim(),
      phone: formState.phone.trim(),
      serviceId: Number(formState.serviceId),
      appointmentDate: formState.appointmentDate!.format("YYYY-MM-DD"),
      startTime: formState.startTime,
      kvkkApproved: formState.kvkkApproved,
      note: formState.note.trim() || undefined,
    };

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const createdAppointment = await appointmentApi.createAppointment(payload);

      if (!createdAppointment) {
        throw new Error("Randevu talebi olusturulurken beklenmeyen bir bos yanit alindi.");
      }

      setSuccessSummary({
        appointment: createdAppointment,
        serviceName:
          selectedService?.name ?? createdAppointment.treatmentServiceName,
        date: payload.appointmentDate,
        time: payload.startTime.slice(0, 5),
      });

      setFormState(initialFormState);
      setFormErrors({});
      setAvailableSlots([]);
      setSlotMessage("Yeni bir talep icin hizmet ve tarih secin.");
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(error, "Randevu talebi gonderilirken bir sorun olustu."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
      <Typography variant="overline" color="secondary.main">
        Randevu
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: 2, maxWidth: 760 }}>
        Gercek backend akisina bagli premium ve sade randevu olusturma deneyimi
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4.5, maxWidth: 820, lineHeight: 1.76 }}>
        Hizmetleri canli olarak backend'den alir, secilen tarih icin uygun saatleri
        listeler ve randevu talebini dogrudan public appointment API uzerinden iletir.
      </Typography>

      {successSummary ? (
        <Alert
          severity="success"
          sx={{ mb: 4, borderRadius: "20px" }}
          onClose={() => setSuccessSummary(null)}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
            Randevu talebiniz alindi
          </Typography>
          <Typography variant="body2">
            Hizmet: {successSummary.serviceName} | Tarih: {successSummary.date} | Saat:{" "}
            {successSummary.time}
          </Typography>
        </Alert>
      ) : null}

      <Grid container spacing={3.5}>
        <Grid item xs={12} lg={5}>
          <AppointmentInfoPanel
            selectedService={selectedService}
            slotCount={availableSlots.length}
            isLoadingSlots={isLoadingSlots}
          />
        </Grid>

        <Grid item xs={12} lg={7}>
          <Card sx={{ borderRadius: "24px" }}>
            <CardContent sx={{ p: { xs: 2.75, md: 3.5 } }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                sx={{ mb: 3 }}
              >
                <Box>
                  <Typography variant="h4" sx={{ lineHeight: 1.12 }}>
                    Randevu formu
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.6 }}>
                    Alanlari doldurun, uygun saat secin ve talebinizi iletin.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <InfoOutlinedIcon color="secondary" sx={{ fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    Tarih backend'e `yyyy-MM-dd` formatinda gonderilir.
                  </Typography>
                </Stack>
              </Stack>

              {serviceLoadError ? (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "18px" }}>
                  {serviceLoadError}
                </Alert>
              ) : null}

              {submitError ? (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "18px" }}>
                  {submitError}
                </Alert>
              ) : null}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2.25}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Ad"
                      value={formState.firstName}
                      onChange={(event) => updateField("firstName", event.target.value)}
                      error={Boolean(formErrors.firstName)}
                      helperText={formErrors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Soyad"
                      value={formState.lastName}
                      onChange={(event) => updateField("lastName", event.target.value)}
                      error={Boolean(formErrors.lastName)}
                      helperText={formErrors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Telefon"
                      placeholder="+90 5xx xxx xx xx"
                      value={formState.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      error={Boolean(formErrors.phone)}
                      helperText={formErrors.phone ?? "Temel telefon kontrolu uygulanir."}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      select
                      fullWidth
                      label="Hizmet"
                      value={formState.serviceId}
                      onChange={(event) => handleServiceChange(event.target.value)}
                      error={Boolean(formErrors.serviceId)}
                      helperText={formErrors.serviceId}
                      disabled={isLoadingServices || Boolean(serviceLoadError)}
                    >
                      {services.map((service) => (
                        <MenuItem key={service.id} value={String(service.id)}>
                          {service.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Tarih"
                      value={formState.appointmentDate}
                      onChange={handleDateChange}
                      disablePast
                      format="DD.MM.YYYY"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: Boolean(formErrors.appointmentDate),
                          helperText: formErrors.appointmentDate,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AvailableSlotSelector
                      slots={availableSlots}
                      selectedTime={formState.startTime}
                      isLoading={isLoadingSlots}
                      hasSearchCriteria={hasSlotCriteria}
                      helperMessage={slotMessage}
                      onSelect={(time) => {
                        updateField("startTime", time);
                        setSlotMessage(null);
                      }}
                    />
                    {formErrors.startTime ? (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 1, display: "block" }}
                      >
                        {formErrors.startTime}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      label="Not"
                      placeholder="Paylasmak istediginiz kisa bir not varsa ekleyebilirsiniz."
                      value={formState.note}
                      onChange={(event) => updateField("note", event.target.value)}
                      helperText={`${formState.note.length}/1000`}
                      inputProps={{ maxLength: 1000 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formState.kvkkApproved}
                          onChange={(event) =>
                            updateField("kvkkApproved", event.target.checked)
                          }
                          color="secondary"
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          KVKK metnini okudum ve onayliyorum.{" "}
                          <Link component={RouterLink} to="/kvkk" underline="hover">
                            KVKK detaylarini incele
                          </Link>
                        </Typography>
                      }
                    />
                    {formErrors.kvkkApproved ? (
                      <Typography variant="caption" color="error" sx={{ display: "block", mt: 0.5 }}>
                        {formErrors.kvkkApproved}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={
                        isSubmitting ||
                        isLoadingServices ||
                        !formState.serviceId ||
                        !formState.appointmentDate ||
                        !formState.startTime
                      }
                      endIcon={<SendRoundedIcon />}
                    >
                      {isSubmitting ? "Randevu talebi gonderiliyor..." : "Randevu talebi olustur"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
