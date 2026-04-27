import { useState } from "react";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ServiceImage } from "../../types/service";

interface ServiceMediaProps {
  title: string;
  subtitle?: string;
  image?: ServiceImage;
  aspectRatio?: string;
  minHeight?: number;
  sx?: SxProps<Theme>;
}

export function ServiceMedia({
  title,
  subtitle,
  image,
  aspectRatio = "4 / 3",
  minHeight = 200,
  sx,
}: ServiceMediaProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const shouldRenderImage = Boolean(image?.src) && !imageFailed;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        aspectRatio,
        minHeight,
        background:
          "linear-gradient(145deg, rgba(20,33,61,0.94) 0%, rgba(63,82,121,0.92) 48%, rgba(199,144,138,0.78) 100%)",
        ...sx,
      }}
    >
      {shouldRenderImage ? (
        <Box
          component="img"
          src={image?.src}
          alt={image?.alt ?? title}
          onError={() => setImageFailed(true)}
          sx={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
      ) : null}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: shouldRenderImage
            ? "linear-gradient(180deg, rgba(20,33,61,0.02) 0%, rgba(20,33,61,0.08) 36%, rgba(20,33,61,0.66) 100%)"
            : "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.26), transparent 22%), radial-gradient(circle at 82% 26%, rgba(255,255,255,0.16), transparent 20%), linear-gradient(145deg, rgba(20,33,61,0.96) 0%, rgba(53,71,114,0.9) 50%, rgba(199,144,138,0.74) 100%)",
        }}
      />

      {!shouldRenderImage ? (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              borderRadius: "999px",
              backgroundColor: "rgba(255,255,255,0.12)",
            },
            "&::before": {
              width: "42%",
              height: "42%",
              left: "8%",
              top: "12%",
            },
            "&::after": {
              width: "28%",
              height: "28%",
              right: "12%",
              bottom: "16%",
            },
          }}
        />
      ) : null}

      <Stack
        spacing={0.65}
        sx={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 18,
          color: "common.white",
        }}
      >
        {!shouldRenderImage ? (
          <BrokenImageOutlinedIcon sx={{ fontSize: 18, opacity: 0.78 }} />
        ) : null}
        {subtitle ? (
          <Typography
            variant="caption"
            sx={{ letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.82 }}
          >
            {subtitle}
          </Typography>
        ) : null}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: shouldRenderImage ? 420 : 380,
          }}
        >
          {title}
        </Typography>
      </Stack>
    </Box>
  );
}

