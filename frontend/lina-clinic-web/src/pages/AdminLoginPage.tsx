import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export function AdminLoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: { xs: 3.5, md: 5 },
            borderRadius: 6,
            background: (theme) => theme.customGradients.card,
          }}
        >
          <Stack spacing={2.5}>
              <Box
                sx={{
                  width: 56,
                height: 56,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                }}
              >
              <AdminPanelSettingsRoundedIcon />
            </Box>
            <Box>
              <Typography variant="overline" color="secondary.main">
                Admin Giris
              </Typography>
              <Typography variant="h2" sx={{ mt: 0.5 }}>
                Yetkili paneline hos geldiniz
              </Typography>
            </Box>
            <Typography color="text.secondary">
              Bu adimda sayfa iskeleti kuruldu. Form gonderimi ve auth state
              yonetimi sonraki iterasyonda gelistirilecek.
            </Typography>
            <Alert severity="info" sx={{ borderRadius: 4 }}>
              Taslak demo: varsayilan alanlar sadece yerlesimi gostermek icindir.
            </Alert>
            <TextField fullWidth label="Kullanici Adi" defaultValue="admin" />
            <TextField fullWidth type="password" label="Sifre" defaultValue="admin123" />
            <Button variant="contained" color="primary">
              Giris Yap
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
