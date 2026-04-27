import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";
import { Container, Paper, Stack, Typography } from "@mui/material";

export function KvkkPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 7, md: 10 } }}>
      <Paper sx={{ p: { xs: 3.5, md: 5 }, borderRadius: 6 }}>
        <Stack spacing={2}>
          <GppGoodRoundedIcon color="secondary" />
          <Typography variant="overline" color="secondary.main">
            KVKK
          </Typography>
          <Typography variant="h2">Aydinlatma ve onay metni alani</Typography>
          <Typography color="text.secondary">
            KVKK icerigi sonraki adimda gercek metinlerle doldurulacaktir. Bu sayfa,
            randevu akisi icin gerekli bilgilendirme ve onay dokumanlarina ayrildi.
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

