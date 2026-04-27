import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const overviewItems = [
  {
    label: "Randevu Takibi",
    description: "Talep, onay, iptal ve tamamlama akislarini tek noktada toplar.",
    icon: <EventAvailableRoundedIcon color="secondary" />,
  },
  {
    label: "Durum Gorunurlugu",
    description: "Admin ekranlari icin sade KPI kartlari ve filtre alanlari planlandi.",
    icon: <InsightsRoundedIcon color="secondary" />,
  },
  {
    label: "Yetkili Erişim",
    description: "Admin alanlari public sayfalardan ayri bir deneyimle kurgulandi.",
    icon: <VerifiedUserRoundedIcon color="secondary" />,
  },
];

export function AdminOverviewCards() {
  return (
    <Grid container spacing={3}>
      {overviewItems.map((item) => (
        <Grid item xs={12} md={4} key={item.label}>
          <Card sx={{ height: "100%", borderRadius: 5 }}>
            <CardContent sx={{ p: 3.5 }}>
              <Stack spacing={2}>
                {item.icon}
                <Typography variant="h5">{item.label}</Typography>
                <Typography color="text.secondary">{item.description}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

