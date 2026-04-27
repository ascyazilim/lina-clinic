import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const heroStats = [
  { value: "15+", label: "Hizmet seçeneği" },
  { value: "5", label: "Ana hizmet kategoriisi" },
  { value: "Online", label: "Randevu talebi" },
];

export function HeroSection() {
  return (
    <Box sx={{ pt: { xs: 6, md: 9 }, pb: { xs: 7, md: 10 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            borderRadius: { xs: "26px", md: "34px" },
            px: { xs: 3, md: 5.5 },
            py: { xs: 4.5, md: 6.5 },
            color: "primary.contrastText",
            background: (theme) => theme.customGradients.hero,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              opacity: 0.35,
              background:
                "radial-gradient(circle at top right, rgba(255,255,255,0.22), transparent 22%), radial-gradient(circle at bottom left, rgba(255,255,255,0.12), transparent 28%)",
            }}
          />
          <Grid
            container
            spacing={{ xs: 4, md: 4.5 }}
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Grid item xs={12} lg={7}>
              <Chip
                icon={<AutoAwesomeRoundedIcon />}
                label="Lina Güzellik Merkezi"
                sx={{
                  mb: 2.5,
                  height: 34,
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.16)",
                  color: "inherit",
                }}
              />
              <Typography variant="h1" sx={{ maxWidth: 760 }}>
                Cilt bakımı, lazer ve estetik uygulamalarda güven veren deneyim
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 2.5,
                  maxWidth: 620,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.7,
                }}
              >
                Lina Güzellik Merkezi; lazer uygulamaları, cilt bakımı, estetik uygulamalar, vücut şekillendirme ve saç uygulamaları alanlarında hizmet seçeneklerini anlaşılır şekilde sunar. Size uygun hizmeti inceleyebilir, müsait tarih ve saatler üzerinden kolayca randevu oluşturabilirsiniz.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
                <Button
                  component={RouterLink}
                  to="/randevu"
                  color="secondary"
                  variant="contained"
                  endIcon={<CalendarMonthRoundedIcon />}
                >
                  Randevu Akisini Kesfet
                </Button>
                <Button
                  component={RouterLink}
                  to="/hizmetler"
                  variant="outlined"
                  color="inherit"
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  Hizmetleri Incele
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={5} sx={{ display: "flex", alignItems: "center" }}>
              <Stack spacing={2.5} sx={{ width: "100%", maxWidth: 470, mx: "auto" }}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: "20px",
                    color: "text.primary",
                    backgroundColor: "rgba(255, 250, 246, 0.94)",
                  }}
                >
                  
                  <Box sx={{ mb: 1.25, textAlign: { xs: "left", lg: "center" } }}>
                    
                    <Typography
                      variant="h3"
                      sx={{
                        mt: 0.4,
                        fontWeight: 700,
                        lineHeight: 1.02,
                        letterSpacing: "-0.03em",
                        color: "primary.main",
                      }}
                    >
                      Lina Güzellik Merkezi
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    Lazer epilasyon, cilt bakımı, estetik uygulamalar, vücut şekillendirme ve saç uygulamaları için hizmet detaylarını görüntüleyebilir;
                    size uygun tarih ve saatten randevu talebi oluşturabilirsiniz.
                  </Typography>
                </Paper>
                <Grid container spacing={2}>
                  {heroStats.map((stat) => (
                    <Grid item xs={12} sm={4} key={stat.label}>
                      <Paper
                        sx={{
                          height: "100%",
                          p: 2.25,
                          borderRadius: "18px",
                          backgroundColor: "rgba(255,255,255,0.14)",
                          color: "inherit",
                          border: "1px solid rgba(255,255,255,0.14)",
                        }}
                      >
                        <Typography variant="h3" sx={{ lineHeight: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ mt: 0.9, color: "rgba(255,255,255,0.78)", lineHeight: 1.55 }}
                        >
                          {stat.label}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
