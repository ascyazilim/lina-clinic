import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function Footer() {
  return (
    <Box component="footer" sx={{ pt: 10, pb: 4 }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(135deg, rgba(20,33,61,0.98) 0%, rgba(32,47,82,0.96) 48%, rgba(199,144,138,0.92) 100%)",
            color: "primary.contrastText",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Typography
                variant="h3"
                sx={{ fontFamily: '"Cormorant Garamond", serif', mb: 1 }}
              >
                Lina Guzellik Merkezi
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.78)", maxWidth: 520 }}>
                Sade bilgi akisi, nazik bir deneyim ve randevu surecini
                kolaylastiran modern bir dijital vitrin.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 800 }}>
                Sayfalar
              </Typography>
              <Stack spacing={1}>
                <Link component={RouterLink} to="/hizmetler" color="inherit">
                  Hizmetler
                </Link>
                <Link component={RouterLink} to="/randevu" color="inherit">
                  Randevu
                </Link>
                <Link component={RouterLink} to="/kvkk" color="inherit">
                  KVKK
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 800 }}>
                Iletisim
              </Typography>
              <Stack spacing={1}>
                <Typography color="rgba(255,255,255,0.78)">
                  Bagdat Caddesi, Istanbul
                </Typography>
                <Typography color="rgba(255,255,255,0.78)">
                  +90 555 000 00 00
                </Typography>
                <Typography color="rgba(255,255,255,0.78)">
                  info@linaclinic.com
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ my: 3, borderColor: "divider" }} />
        <Typography variant="body2" color="text.secondary">
          © 2026 Lina Clinic. Tum haklari saklidir.
        </Typography>
      </Container>
    </Box>
  );
}
