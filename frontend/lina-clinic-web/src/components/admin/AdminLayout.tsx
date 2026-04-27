import { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearAuth } from "../../types/auth";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

const drawerWidth = 304;

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/admin/login", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(199,144,138,0.16), transparent 28%), linear-gradient(180deg, #fffdfa 0%, #fff7f2 100%)",
      }}
    >
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(255, 250, 246, 0.9)",
          backdropFilter: "blur(18px)",
        }}
      >
        <AdminHeader
          pathname={location.pathname}
          onMenuOpen={() => setMobileOpen(true)}
          onLogout={handleLogout}
        />
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: drawerWidth,
              background:
                "linear-gradient(180deg, rgba(255,250,246,0.98) 0%, rgba(255,244,239,0.98) 100%)",
            },
          }}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <AdminSidebar
            onNavigate={() => setMobileOpen(false)}
            onLogout={handleLogout}
          />
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
          <AdminSidebar onLogout={handleLogout} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar sx={{ minHeight: 82 }} />
        <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2.5, md: 3.5 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
