import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import {
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export function AdminAppointmentsPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="overline" color="secondary.main">
          Admin Randevular
        </Typography>
        <Typography variant="h3">Randevu listeleme iskeleti</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 760 }}>
          Filtreler ve tablo alani sonraki adimda API'ye baglanacak. Bu asamada
          yalnizca sayfa yerlesimi olusturuldu.
        </Typography>
      </Stack>

      <Paper sx={{ p: 3.5, borderRadius: 5 }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
          <FilterAltRoundedIcon color="secondary" />
          <Typography variant="h5">Filtre Alani</Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={3}>
            <TextField fullWidth label="Durum" placeholder="REQUESTED" />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextField fullWidth label="Tarih" placeholder="yyyy-aa-gg" />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextField fullWidth label="Hizmet ID" placeholder="1" />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <TextField fullWidth label="Personel ID" placeholder="1" />
          </Grid>
        </Grid>
      </Paper>

      <Paper
        sx={{
          p: 4,
          minHeight: 320,
          borderRadius: 5,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
      >
        <Stack spacing={1.5} alignItems="center">
          <TableRowsRoundedIcon color="secondary" sx={{ fontSize: 36 }} />
          <Typography variant="h5">Tablo alani hazir</Typography>
          <Typography color="text.secondary">
            Gercek randevu tablosu ve aksiyon butonlari sonraki gelistirme adimina
            birakildi.
          </Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}

