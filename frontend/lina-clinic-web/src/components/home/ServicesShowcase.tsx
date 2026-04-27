import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import type { ReactNode } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { ServiceCategoryGroup } from "../../types/service";
import { featuredCategories } from "../services/serviceCatalog";
import { ServiceMedia } from "../services/ServiceMedia";

const showcaseHighlights = [
  {
    title: "5 kategori",
    description: "Lazer, estetik, cilt, vucut ve sac basliklari net bir yapiyla gruplanir.",
    icon: <CategoryRoundedIcon color="secondary" />,
  },
  {
    title: "15 hizmet",
    description: "Her kategori altinda temel uygulamalar kisa aciklama ve sure bilgisiyle sunulur.",
    icon: <MedicalServicesRoundedIcon color="secondary" />,
  },
  {
    title: "Online randevu akisi",
    description: "Hizmet seciminden uygun saat goruntulemeye uzanan akisa hazir bir zemin vardir.",
    icon: <EventAvailableRoundedIcon color="secondary" />,
  },
];

interface ShowcaseInfoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

function ShowcaseInfoCard({ title, description, icon }: ShowcaseInfoCardProps) {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: "18px",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "rgba(255, 255, 255, 0.68)",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "14px",
            display: "grid",
            placeItems: "center",
            backgroundColor: "rgba(199, 144, 138, 0.14)",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Stack spacing={0.5}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

interface CategoryShowcaseCardProps {
  category: ServiceCategoryGroup;
  order: number;
}

function CategoryShowcaseCard({ category, order }: CategoryShowcaseCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "22px",
        overflow: "hidden",
      }}
    >
      <ServiceMedia
        title={category.name}
        subtitle={`Kategori 0${order + 1}`}
        image={category.image}
        aspectRatio="16 / 9"
        minHeight={200}
        showOverlayText={false}
      />

      <CardContent
        sx={{
          p: { xs: 2.5, md: 2.75 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flexGrow: 1,
        }}
      >
        <Stack
          direction="row"
          spacing={1.25}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              variant="caption"
              color="secondary.main"
              sx={{ letterSpacing: "0.09em", textTransform: "uppercase" }}
            >
              Kategori 0{order + 1}
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.7, lineHeight: 1.15, maxWidth: 360 }}>
              {category.name}
            </Typography>
          </Box>
          <Chip
            label={`${category.serviceCount} hizmet`}
            size="small"
            variant="outlined"
            sx={{ borderRadius: "10px", flexShrink: 0 }}
          />
        </Stack>

        <Typography
          color="text.secondary"
          sx={{
            lineHeight: 1.68,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: { xs: "auto", sm: "5.1em" },
          }}
        >
          {category.description}
        </Typography>

        <Box
          sx={{
            p: 1.75,
            borderRadius: "16px",
            backgroundColor: "rgba(20, 33, 61, 0.035)",
            border: "1px solid",
            borderColor: "divider",
            mt: "auto",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Bu kategorideki hizmetler
          </Typography>
          <Stack spacing={0.85} sx={{ mt: 1.1 }}>
            {category.services.slice(0, 3).map((service) => (
              <Typography
                key={service.slug}
                variant="body2"
                sx={{ fontWeight: 600, color: "text.primary", lineHeight: 1.45 }}
              >
                {service.name}
              </Typography>
            ))}
          </Stack>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.4}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{
            pt: 1.5,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Hizmetler sayfasinda kategori detayini acin
          </Typography>
          <Button
            component={RouterLink}
            to={`/hizmetler#${category.slug}`}
            color="secondary"
            endIcon={<ArrowOutwardRoundedIcon />}
            sx={{ px: 0, minHeight: "auto" }}
          >
            Kategoriye Git
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function ServicesShowcase() {
  const firstRowCategories = featuredCategories.slice(0, 3);
  const secondRowCategories = featuredCategories.slice(3);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 9 } }}>
      <Paper
        sx={{
          p: { xs: 2.5, md: 3.25, lg: 3.75 },
          borderRadius: "28px",
          background: (theme) => theme.customGradients.card,
          mb: 4,
        }}
      >
        <Grid container spacing={{ xs: 2.5, md: 3.25 }} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Stack spacing={1.6} sx={{ height: "100%", justifyContent: "center" }}>
              <Typography variant="overline" color="secondary.main">
                Hizmet Mimarisi
              </Typography>
              <Typography variant="h2" sx={{ maxWidth: 680 }}>
                Hizmet alanlarini daha net ve dengeli gosteren bir kategori vitrini
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 620, lineHeight: 1.75 }}>
                Kategoriler, aciklama dili ve ilgili hizmet basliklariyla birlikte daha
                kurumsal bir duzende sunulur. Bu alan ana sayfada bilgi hiyerarsisini
                guclendirirken hizmetler sayfasina gecisi de daha anlamli hale getirir.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ xs: "flex-start", sm: "center" }}
                sx={{ pt: 0.6 }}
              >
                <Button component={RouterLink} to="/hizmetler" variant="outlined">
                  Tum Hizmetler
                </Button>
                <Typography variant="body2" color="text.secondary">
                  5 kategori ve 15 hizmet, daha okunabilir bir section mantigiyla sunulur.
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={1.5}>
              {showcaseHighlights.map((item) => (
                <ShowcaseInfoCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Stack spacing={3}>
        <Grid container spacing={3} alignItems="stretch">
          {firstRowCategories.map((category, index) => (
            <Grid item xs={12} sm={6} lg={4} key={category.slug}>
              <CategoryShowcaseCard category={category} order={index} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          {secondRowCategories.map((category, index) => (
            <Grid item xs={12} sm={6} lg={5} key={category.slug}>
              <CategoryShowcaseCard category={category} order={index + 3} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
