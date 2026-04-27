import CallRoundedIcon from "@mui/icons-material/CallRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { Container, Paper, Stack, Typography } from "@mui/material";

export function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 7, md: 10 } }}>
      <Typography variant="overline" color="secondary.main">
        Iletisim
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
        Ulasim ve iletisim bilgilerinin premium sunumu
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Harita, form ve ek iletisim detaylari sonraki iterasyonda bu sayfaya
        eklenecektir.
      </Typography>
      <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 6 }}>
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <PlaceRoundedIcon color="secondary" />
            <Typography>Bagdat Caddesi, Istanbul</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <CallRoundedIcon color="secondary" />
            <Typography>+90 555 000 00 00</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <ScheduleRoundedIcon color="secondary" />
            <Typography>Pazartesi - Cumartesi / 09:00 - 18:00</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}

