import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export function AppointmentPlaceholder() {
  return (
    <Stack spacing={3}>
      <Alert severity="info" sx={{ borderRadius: 4 }}>
        Bu adimda yalnizca sayfa iskeleti kuruldu. Gercek randevu formu, slot cekme
        ve submit akisi sonraki iterasyonda eklenecek.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h4" sx={{ mb: 1.5 }}>
                Randevu Formu Alani
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Alan yerlesimleri ve genel deneyim hazirlandi. Form mantigi bu adimda
                baglanmadi.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Ad" placeholder="Ornek" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Soyad" placeholder="Danisan" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Telefon" placeholder="+90 5xx xxx xx xx" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Hizmet" placeholder="Secilecek" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Tarih" placeholder="Takvim baglanacak" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Card
            sx={{
              borderRadius: 5,
              height: "100%",
              background: (theme) => theme.customGradients.card,
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Planlanan Akis
              </Typography>
              <Stack spacing={2.5}>
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <CalendarMonthRoundedIcon color="secondary" />
                  <Typography>Takvim secimi ve ileri tarih kurallari</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <ScheduleRoundedIcon color="secondary" />
                  <Typography>Backend'den uygun saatlerin alinmasi</Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <TaskAltRoundedIcon color="secondary" />
                  <Typography>KVKK onayi ile kontrollu form gonderimi</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 3 }}>
                <Chip label="MUI X Date Pickers" />
                <Chip label="Axios" />
                <Chip label="Responsive Layout" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

