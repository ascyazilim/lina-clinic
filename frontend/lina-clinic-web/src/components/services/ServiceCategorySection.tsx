import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import type { ServiceCategoryGroup } from "../../types/service";
import { ServiceCard } from "./ServiceCard";
import { ServiceMedia } from "./ServiceMedia";

interface ServiceCategorySectionProps {
  category: ServiceCategoryGroup;
  order: number;
}

export function ServiceCategorySection({
  category,
  order,
}: ServiceCategorySectionProps) {
  return (
    <Box component="section" id={category.slug} sx={{ scrollMarginTop: 108 }}>
      <Paper
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: "26px",
          backgroundColor: "rgba(255, 252, 248, 0.92)",
        }}
      >
        <Grid container spacing={3.25}>
          <Grid item xs={12} lg={4}>
            <Stack spacing={2}>
              <ServiceMedia
                title={category.name}
                subtitle={`Kategori 0${order + 1}`}
                image={category.image}
                aspectRatio="5 / 4"
                minHeight={280}
                sx={{ borderRadius: "20px" }}
              />
              <Stack spacing={1.2} sx={{ px: { xs: 0.25, md: 0.5 } }}>
                <Typography
                  variant="overline"
                  color="secondary.main"
                  sx={{ letterSpacing: "0.08em" }}
                >
                  {category.serviceCount} hizmet
                </Typography>
                <Typography variant="h3" sx={{ lineHeight: 1.06 }}>
                  {category.name}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {category.description}
                </Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Grid container spacing={2.5}>
              {category.services.map((service) => (
                <Grid item xs={12} sm={6} xl={4} key={service.slug}>
                  <ServiceCard service={service} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
