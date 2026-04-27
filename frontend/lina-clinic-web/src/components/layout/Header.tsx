import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const navigationItems = [
  { label: "Anasayfa", to: "/" },
  { label: "Hizmetler", to: "/hizmetler" },
  { label: "Randevu", to: "/randevu" },
  { label: "Hakkimizda", to: "/hakkimizda" },
  { label: "Iletisim", to: "/iletisim" },
  { label: "KVKK", to: "/kvkk" },
];

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) =>
    to === "/"
      ? location.pathname === to
      : location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgba(255, 250, 246, 0.82)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 82, gap: 2 }}>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  color: "primary.contrastText",
                  background:
                    "linear-gradient(135deg, #14213d 0%, #c7908a 100%)",
                }}
              >
                <SpaOutlinedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Lina Guzellik Merkezi
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: "1.55rem",
                    lineHeight: 1,
                  }}
                >
                  Lina Clinic
                </Typography>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color={isActive(item.to) ? "secondary" : "inherit"}
                  variant={isActive(item.to) ? "contained" : "text"}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Button
              component={RouterLink}
              to="/admin/login"
              variant="outlined"
              color="primary"
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              Admin Giris
            </Button>

            <IconButton
              color="primary"
              sx={{ display: { xs: "inline-flex", md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            p: 2,
            backgroundColor: "background.paper",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            mb: 1,
          }}
        >
          Menu
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Lina Clinic sayfalarina hizli erisim
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <List disablePadding>
          {navigationItems.map((item) => (
            <ListItemButton
              key={item.to}
              component={RouterLink}
              to={item.to}
              onClick={() => setDrawerOpen(false)}
              selected={isActive(item.to)}
              sx={{ borderRadius: 3, mb: 0.5 }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
          <ListItemButton
            component={RouterLink}
            to="/admin/login"
            onClick={() => setDrawerOpen(false)}
            sx={{ borderRadius: 3, mt: 1 }}
          >
            <ListItemText primary="Admin Giris" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
}

