import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import MedicalInformationRoundedIcon from "@mui/icons-material/MedicalInformationRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { ServiceMedia } from "../services/ServiceMedia";
import type { ServiceSummary } from "../../types/service";

interface AppointmentInfoPanelProps {
  selectedService: ServiceSummary | null;
  slotCount: number;
  isLoadingSlots: boolean;
}

const appointmentHighlights = [
  {
    icon: <CalendarMonthRoundedIcon color="secondary" />,
    title: "Tarih secimi",
    description: "Bugunden onceki gunler kapali tutulur ve uygun gunler uzerinden ilerlenir.",
  },
  {
    icon: <MedicalInformationRoundedIcon color="secondary" />,
    title: "Hizmet uyumu",
    description: "Secilen hizmete gore sure bilgisi ve uygun saat listesi yenilenir.",
  },
  {
    icon: <VerifiedRoundedIcon color="secondary" />,
    title: "KVKK onayi",
    description: "Randevu talebi, KVKK onayi tamamlanmadan gonderilmez.",
  },
];

export function AppointmentInfoPanel({
  selectedService,
  slotCount,
  isLoadingSlots,
}: AppointmentInfoPanelProps) {
  return (
    <Stack spacing={3}>
      <Card
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <ServiceMedia
          title={selectedService?.name ?? "Randevu planinizi olusturun"}
          subtitle={selectedService?.category.name ?? "Lina Clinic"}
          image={selectedService?.image}
          aspectRatio="16 / 10"
          minHeight={250}
        />
        <CardContent sx={{ p: { xs: 2.75, md: 3 } }}>
          <Stack spacing={1.35}>
            <Typography variant="h4" sx={{ lineHeight: 1.12 }}>
              {selectedService?.name ?? "Sakin ve net bir randevu deneyimi"}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.72 }}>
              {selectedService?.shortDescription ??
                "Hizmet, tarih ve saat seciminizi tamamlayarak randevu talebinizi dogrudan backend akisi ile iletebilirsiniz."}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 2.5 }}>
            {selectedService ? (
              <>
                <Chip label={selectedService.category.name} variant="outlined" />
                <Chip label={`${selectedService.durationMinutes} dk`} />
              </>
            ) : (
              <Chip label="Hizmet secimi ile ozet guncellenir" variant="outlined" />
            )}
            <Chip
              label={
                isLoadingSlots
                  ? "Saatler yukleniyor"
                  : slotCount > 0
                    ? `${slotCount} uygun saat`
                    : "Saat secimi bekleniyor"
              }
              color={slotCount > 0 ? "secondary" : "default"}
            />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: "22px" }}>
        <CardContent sx={{ p: { xs: 2.75, md: 3 } }}>
          <Typography variant="h5" sx={{ mb: 2.25 }}>
            Randevu sureci
          </Typography>
          <Stack spacing={2.2}>
            {appointmentHighlights.map((item) => (
              <Box
                key={item.title}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: 1.6,
                  alignItems: "start",
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "14px",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "rgba(199, 144, 138, 0.12)",
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.65 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
