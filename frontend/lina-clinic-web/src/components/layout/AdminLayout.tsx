import { useState } from "react";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";

const drawerWidth = 280;

const adminNavigation = [
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

function AdminNav({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const location = useLocation();

  return (
    <Box sx={{ height: "100%", p: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Cormorant Garamond", serif',
          lineHeight: 1,
        }}
      >
        Lina Admin
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Randevu ve operasyon akislarinin yonetim alani
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List disablePadding>
        {adminNavigation.map((item) => (
          <ListItemButton
            key={item.to}
            component={RouterLink}
            to={item.to}
            onClick={onNavigate}
            selected={location.pathname === item.to}
            sx={{ borderRadius: 3, mb: 0.75 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(255, 250, 246, 0.88)",
        }}
      >
        <Toolbar sx={{ minHeight: 76 }}>
          <IconButton
            color="primary"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Box>
            <Typography variant="overline" color="text.secondary">
              Lina Clinic Admin Panel
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Kontrol Merkezi
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: drawerWidth,
              backgroundColor: "background.paper",
            },
          }}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <AdminNav onNavigate={() => setMobileOpen(false)} />
        </Drawer>

        <Drawer
          variant="permanent"
          open
          PaperProps={{
            sx: {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
              background:
                "linear-gradient(180deg, rgba(255,250,246,0.98) 0%, rgba(255,244,239,0.98) 100%)",
            },
          }}
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          <AdminNav />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          pt: "92px",
          px: { xs: 2, md: 4 },
          pb: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

