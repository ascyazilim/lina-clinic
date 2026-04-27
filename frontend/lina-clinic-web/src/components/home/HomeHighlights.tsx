import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const highlights = [
  {
    title: "Sade bilgi dili",
    description:
      "Hizmetler reklam tonu yerine anlasilir, sakin ve bakimi kolay bir yapiyla sunulur.",
    icon: <LightModeRoundedIcon color="secondary" />,
  },
  {
    title: "Guvenli akis zemini",
    description:
      "Public ve admin alanlari ayri kurgulanarak sonraki gelistirmeler icin temiz bir temel olusturulur.",
    icon: <VerifiedRoundedIcon color="secondary" />,
  },
  {
    title: "Randevu uyumlulugu",
    description:
      "Tasarim, backend public slot ve admin yonetim akislariyla uyumlu gelistirilmeye hazirdir.",
    icon: <HealthAndSafetyRoundedIcon color="secondary" />,
  },
];

export function HomeHighlights() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Grid container spacing={3}>
        {highlights.map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Card sx={{ height: "100%", borderRadius: "20px" }}>
              <CardContent sx={{ p: { xs: 2.75, md: 3 } }}>
                <Stack spacing={1.85}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "14px",
                      backgroundColor: "rgba(199, 144, 138, 0.12)",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h5" sx={{ lineHeight: 1.18 }}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
