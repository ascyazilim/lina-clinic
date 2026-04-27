import { useEffect } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ServiceCategorySection } from "../components/services/ServiceCategorySection";
import {
  serviceCatalog,
  serviceCategoryGroups,
} from "../components/services/serviceCatalog";

export function ServicesPage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const targetId = decodeURIComponent(location.hash.replace(/^#/, ""));

    const timeoutId = window.setTimeout(() => {
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 60);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [location.hash]);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 7, md: 10 } }}>
      <Box sx={{ mb: 5.5 }}>
        <Typography variant="overline" color="secondary.main">
          Hizmetler
        </Typography>
        <Typography variant="h2" sx={{ maxWidth: 780, mb: 2 }}>
          Kategori bazli, daha okunabilir ve profesyonel bir hizmet vitrini
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 780, lineHeight: 1.76 }}>
          Hizmetler once kategori aciklamasi, ardindan ilgili uygulama kartlari ile
          listelenir. Bu yapi bilgi hiyerarsisini guclendirirken kartlarin icindeki
          metin akislarini daha duzenli hale getirir.
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        sx={{ mb: 5, color: "text.secondary" }}
      >
        <Typography variant="body2">{serviceCategoryGroups.length} kategori</Typography>
        <Typography variant="body2" sx={{ display: { xs: "none", md: "block" } }}>
          /
        </Typography>
        <Typography variant="body2">{serviceCatalog.length} hizmet basligi</Typography>
      </Stack>

      <Stack spacing={4}>
        {serviceCategoryGroups.map((category, index) => (
          <ServiceCategorySection
            key={category.slug}
            category={category}
            order={index}
          />
        ))}
      </Stack>
    </Container>
  );
}
