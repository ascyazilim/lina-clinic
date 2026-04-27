import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { ServiceDetail } from "../../types/service";
import { ServiceMedia } from "./ServiceMedia";

interface ServiceCardProps {
  service: ServiceDetail;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <ServiceMedia
        title={service.name}
        subtitle={service.category.name}
        image={service.image}
        aspectRatio="16 / 10"
        minHeight={190}
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
        <Stack spacing={1.2} sx={{ flexGrow: 1 }}>
          <Typography
            variant="caption"
            color="secondary.main"
            sx={{ letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            {service.category.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: "1.18rem",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {service.name}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 1.65,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {service.shortDescription}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1.25}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            pt: 1.25,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              px: 1.4,
              py: 0.8,
              borderRadius: "12px",
              backgroundColor: "rgba(20, 33, 61, 0.04)",
            }}
          >
            <ScheduleRoundedIcon sx={{ fontSize: 16, color: "secondary.main" }} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              {service.durationMinutes} dk
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to={`/hizmetler/${service.slug}`}
            color="primary"
            endIcon={<ArrowOutwardRoundedIcon />}
            sx={{ px: 0, minHeight: "auto" }}
          >
            Detayi Incele
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

