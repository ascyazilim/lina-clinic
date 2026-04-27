import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { getAuth } from "../../types/auth";

const pageMeta: Record<string, { overline: string; title: string }> = {
  "/admin/dashboard": {
    overline: "Admin Dashboard",
    title: "Randevu operasyon ozetleri",
  },
  "/admin/randevular": {
    overline: "Admin Randevular",
    title: "Randevu listeleme ve durum yonetimi",
  },
};

interface AdminHeaderProps {
  pathname: string;
  onMenuOpen: () => void;
  onLogout: () => void;
}

export function AdminHeader({
  pathname,
  onMenuOpen,
  onLogout,
}: AdminHeaderProps) {
  const auth = getAuth();
  const currentPageMeta = pageMeta[pathname] ?? {
    overline: "Lina Clinic Admin",
    title: "Yonetim paneli",
  };

  return (
    <Toolbar sx={{ minHeight: 82, gap: 2 }}>
      <IconButton
        color="primary"
        edge="start"
        onClick={onMenuOpen}
        sx={{ display: { md: "none" } }}
      >
        <MenuRoundedIcon />
      </IconButton>

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="overline" color="text.secondary">
          {currentPageMeta.overline}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, lineHeight: 1.12 }}>
          {currentPageMeta.title}
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1.25}
        alignItems="center"
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Chip
          label={auth?.role ?? "ADMIN"}
          color="secondary"
          variant="outlined"
          sx={{ borderRadius: "10px", fontWeight: 700 }}
        />
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {auth?.fullName ?? "Admin User"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {auth?.username ?? "admin"}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="primary"
          onClick={onLogout}
          startIcon={<LogoutRoundedIcon />}
        >
          Cikis
        </Button>
      </Stack>
    </Toolbar>
  );
}
