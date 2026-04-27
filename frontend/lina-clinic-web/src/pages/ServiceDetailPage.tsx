import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ServiceCard } from "../components/services/ServiceCard";
import { ServiceMedia } from "../components/services/ServiceMedia";
import {
  getRelatedServices,
  getServiceBySlug,
} from "../components/services/serviceCatalog";

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  const relatedServices = getRelatedServices(slug).slice(0, 3);

  if (!service) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        <Paper sx={{ p: { xs: 3.5, md: 5 }, borderRadius: "24px" }}>
          <Typography variant="h3" sx={{ mb: 1.5 }}>
            Hizmet bulunamadi
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Secilen slug icin gosterilecek bir hizmet kaydi bulunamadi.
          </Typography>
          <Button component={RouterLink} to="/hizmetler" variant="outlined">
            Hizmetler Sayfasina Don
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
      <Paper
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: "26px",
          background: (theme) => theme.customGradients.card,
        }}
      >
        <Grid container spacing={3.5}>
          <Grid item xs={12}>
            <ServiceMedia
              title={service.name}
              subtitle={service.category.name}
              image={service.image}
              aspectRatio="16 / 7"
              minHeight={260}
              sx={{ borderRadius: "22px" }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="overline" color="secondary.main">
              Hizmet Detayi
            </Typography>
            <Typography variant="h2" sx={{ mt: 1, mb: 2, maxWidth: 720 }}>
              {service.name}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 720, lineHeight: 1.76 }}>
              {service.detailDescription}
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
              <Button component={RouterLink} to="/hizmetler" variant="outlined">
                Hizmet Listesine Don
              </Button>
              <Button
                component={RouterLink}
                to="/randevu"
                variant="contained"
                color="secondary"
                endIcon={<ArrowForwardRoundedIcon />}
              >
                Randevu Sayfasina Git
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Paper sx={{ p: 2.5, borderRadius: "18px" }}>
                <Typography variant="caption" color="text.secondary">
                  Kategori
                </Typography>
                <Typography variant="h5" sx={{ mt: 0.8, lineHeight: 1.2 }}>
                  {service.category.name}
                </Typography>
              </Paper>
              <Paper sx={{ p: 2.5, borderRadius: "18px" }}>
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <ScheduleRoundedIcon color="secondary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Tahmini sure
                    </Typography>
                    <Typography variant="h5">{service.durationMinutes} dk</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2.5}>
              {service.overviewPoints.map((point) => (
                <Grid item xs={12} md={4} key={point}>
                  <Paper sx={{ p: 2.5, borderRadius: "18px", height: "100%" }}>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {point}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {relatedServices.length > 0 ? (
            <Grid item xs={12}>
              <Stack spacing={2.5} sx={{ mt: 0.5 }}>
                <Typography variant="h3">Ayni kategoriden diger hizmetler</Typography>
                <Grid container spacing={2.5}>
                  {relatedServices.map((relatedService) => (
                    <Grid item xs={12} md={4} key={relatedService.slug}>
                      <ServiceCard service={relatedService} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>
          ) : null}
        </Grid>
      </Paper>
    </Container>
  );
}
