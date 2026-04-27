import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { featuredCategories } from "../services/serviceCatalog";
import { ServiceMedia } from "../services/ServiceMedia";

export function ServicesShowcase() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "flex-end" }}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="overline" color="secondary.main">
            Hizmet Mimarisi
          </Typography>
          <Typography variant="h2" sx={{ maxWidth: 700, mb: 1.2 }}>
            Kategori ve hizmet hiyerarsisini daha net gosteren servis vitrini
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 680, lineHeight: 1.75 }}>
            Her kategori kendi aciklamasi, gorsel alani ve ilgili hizmet basliklariyla
            sunulur. Bu duzen masaustu ve mobilde daha okunabilir bir akis saglar.
          </Typography>
        </Box>
        <Button component={RouterLink} to="/hizmetler" variant="outlined">
          Tum Hizmetler
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {featuredCategories.map((category, index) => (
          <Grid item xs={12} md={6} key={category.slug}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "22px",
                overflow: "hidden",
              }}
            >
              <Grid container sx={{ height: "100%" }}>
                <Grid item xs={12} sm={5}>
                  <ServiceMedia
                    title={category.name}
                    subtitle={`Kategori 0${index + 1}`}
                    image={category.image}
                    aspectRatio="4 / 3"
                    minHeight={220}
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <CardContent
                    sx={{
                      p: { xs: 2.75, md: 3 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="h5" sx={{ lineHeight: 1.18 }}>
                        {category.name}
                      </Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.68 }}>
                        {category.description}
                      </Typography>
                    </Stack>

                    <Box
                      sx={{
                        display: "grid",
                        gap: 0.8,
                        mt: "auto",
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Bu kategorideki hizmetler
                      </Typography>
                      {category.services.slice(0, 3).map((service) => (
                        <Typography
                          key={service.slug}
                          variant="body2"
                          sx={{ fontWeight: 600, color: "text.primary" }}
                        >
                          {service.name}
                        </Typography>
                      ))}
                    </Box>

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={1.5}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      sx={{
                        pt: 1.5,
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {category.serviceCount} hizmet basligi
                      </Typography>
                      <Button
                        component={RouterLink}
                        to={`/hizmetler#${category.slug}`}
                        color="secondary"
                        endIcon={<ArrowOutwardRoundedIcon />}
                      >
                        Kategoriye Git
                      </Button>
                    </Stack>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
