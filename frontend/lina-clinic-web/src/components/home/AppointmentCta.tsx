import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function AppointmentCta() {
  return (
    <Container maxWidth="xl" sx={{ pb: { xs: 4, md: 8 } }}>
      <Paper
        sx={{
          p: { xs: 3.5, md: 4.5 },
          borderRadius: "24px",
          background: (theme) => theme.customGradients.accent,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2.5, md: 4 }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Box sx={{ maxWidth: 760 }}>
            <Typography variant="h3" sx={{ mb: 1.25, lineHeight: 1.08 }}>
              Randevu deneyimi icin yer hazir
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.72 }}>
              Bu adimda sadece iskelet kuruldu. Sonraki iterasyonda uygun saat secimi,
              form validasyonu ve basari ekranlari eklenecek.
            </Typography>
          </Box>
          <Stack spacing={1.25} alignItems={{ xs: "stretch", md: "flex-end" }}>
            <Button
              component={RouterLink}
              to="/randevu"
              variant="contained"
              color="primary"
              endIcon={<EastRoundedIcon />}
            >
              Randevu Sayfasina Git
            </Button>
            <Typography variant="body2" color="text.secondary">
              Slot secimi ve form gonderimi sonraki gelistirme adiminda eklenecek.
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
