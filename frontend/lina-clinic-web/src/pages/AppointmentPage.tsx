import { Container, Typography } from "@mui/material";
import { AppointmentPlaceholder } from "../components/appointment/AppointmentPlaceholder";

export function AppointmentPage() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
      <Typography variant="overline" color="secondary.main">
        Randevu
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
        Randevu sayfasi iskeleti
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
        Formun gercek mantigi sonraki adimda eklenecek. Bu ekranda sayfa hiyerarsisi,
        responsive yerlesim ve premium gorunum hazirlandi.
      </Typography>
      <AppointmentPlaceholder />
    </Container>
  );
}

