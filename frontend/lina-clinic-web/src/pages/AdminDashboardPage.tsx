import { Box, Paper, Stack, Typography } from "@mui/material";
import { AdminOverviewCards } from "../components/admin/AdminOverviewCards";

export function AdminDashboardPage() {
  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="overline" color="secondary.main">
          Dashboard
        </Typography>
        <Typography variant="h3" sx={{ mt: 0.5 }}>
          Admin akislarinin genel gorunumu
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>
          Bu ekran, sonraki adimda toplam randevu sayilari, durum dagilimlari ve
          gunluk operasyon notlariyla genisletilecek.
        </Typography>
      </Box>
      <AdminOverviewCards />
      <Paper sx={{ p: 4, borderRadius: 5 }}>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          Sonraki Adimlar
        </Typography>
        <Typography color="text.secondary">
          Login state, protected route davranisi ve admin tablolari bu yerlesim
          korunarak ilerletilecek.
        </Typography>
      </Paper>
    </Stack>
  );
}

