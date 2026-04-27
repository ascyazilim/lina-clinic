import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { getAuth } from "../../types/auth";

const navigationItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: <DashboardRoundedIcon />,
  },
  {
    label: "Randevular",
    to: "/admin/randevular",
    icon: <EventNoteRoundedIcon />,
  },
  {
    label: "Siteye Don",
    to: "/",
    icon: <LanguageRoundedIcon />,
  },
];

interface AdminSidebarProps {
  onNavigate?: () => void;
  onLogout: () => void;
}

export function AdminSidebar({ onNavigate, onLogout }: AdminSidebarProps) {
  const location = useLocation();
  const auth = getAuth();

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", p: 2.25 }}>
      <Stack spacing={1.2}>
        <Typography
          variant="h4"
          sx={{ fontFamily: '"Cormorant Garamond", serif', lineHeight: 1 }}
        >
          Lina Clinic
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Admin paneli, randevu akislarini daha kontrollu ve okunabilir bir yapida
          yonetmek icin tasarlandi.
        </Typography>
      </Stack>

      <Paper
        sx={{
          mt: 2.5,
          p: 2,
          borderRadius: "18px",
          backgroundColor: "rgba(255,255,255,0.72)",
        }}
      >
        <Typography variant="caption" color="secondary.main" sx={{ letterSpacing: "0.08em" }}>
          Oturum
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 0.7, fontWeight: 800 }}>
          {auth?.fullName ?? "Yetkili Kullanici"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {auth?.username ?? "admin"} / {auth?.role ?? "ADMIN"}
        </Typography>
      </Paper>

      <Divider sx={{ my: 2.25 }} />

      <List disablePadding sx={{ flexGrow: 1 }}>
        {navigationItems.map((item) => {
          const isSelected =
            item.to !== "/" &&
            (location.pathname === item.to ||
              location.pathname.startsWith(`${item.to}/`));

          return (
            <ListItemButton
              key={item.to}
              component={RouterLink}
              to={item.to}
              onClick={onNavigate}
              selected={isSelected}
              sx={{
                mb: 0.75,
                borderRadius: "14px",
                px: 1.5,
                py: 1.1,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>

      <Button
        variant="outlined"
        color="primary"
        startIcon={<LogoutRoundedIcon />}
        onClick={onLogout}
        sx={{ justifyContent: "flex-start", borderRadius: "14px" }}
      >
        Cikis Yap
      </Button>
    </Box>
  );
}
