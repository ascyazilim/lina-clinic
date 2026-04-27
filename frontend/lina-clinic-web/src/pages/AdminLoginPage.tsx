import { useState } from "react";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { getApiErrorMessage } from "../api/client";
import {
  isAuthenticated,
  setAuth,
  type LoginRequest,
} from "../types/auth";

interface LoginFormState {
  username: string;
  password: string;
}

const initialFormState: LoginFormState = {
  username: "admin",
  password: "admin123",
};

export function AdminLoginPage() {
  const [formState, setFormState] = useState<LoginFormState>(initialFormState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const redirectPath =
    (
      location.state as
        | { from?: { pathname?: string } }
        | undefined
    )?.from?.pathname ?? "/admin/dashboard";

  if (isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange =
    (field: keyof LoginFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((current) => ({
        ...current,
        [field]: event.target.value,
      }));
      setErrorMessage(null);
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: LoginRequest = {
      username: formState.username.trim(),
      password: formState.password,
    };

    if (!payload.username || !payload.password) {
      setErrorMessage("Kullanici adi ve sifre alanlari zorunludur.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const response = await authApi.login(payload);

      if (!response) {
        throw new Error("Login yaniti bos geldi.");
      }

      setAuth(response);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, "Giris yapilirken bir sorun olustu."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        py: 6,
        background:
          "radial-gradient(circle at top left, rgba(199,144,138,0.16), transparent 32%), linear-gradient(180deg, #fffdfa 0%, #fff5ef 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            overflow: "hidden",
            borderRadius: "28px",
            background: (theme) => theme.customGradients.card,
          }}
        >
          <Grid container>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  height: "100%",
                  p: { xs: 3, md: 4 },
                  background:
                    "linear-gradient(180deg, rgba(20,33,61,0.98) 0%, rgba(41,58,96,0.96) 62%, rgba(199,144,138,0.94) 100%)",
                  color: "common.white",
                }}
              >
                <Stack spacing={2.2} sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "18px",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "rgba(255,255,255,0.14)",
                    }}
                  >
                    <AdminPanelSettingsRoundedIcon sx={{ fontSize: 30 }} />
                  </Box>

                  <Box>
                    <Typography variant="overline" sx={{ opacity: 0.84 }}>
                      Lina Clinic Admin
                    </Typography>
                    <Typography variant="h2" sx={{ mt: 0.7, maxWidth: 420 }}>
                      Yetkili yonetim paneline guvenli giris
                    </Typography>
                  </Box>

                  <Typography sx={{ maxWidth: 420, lineHeight: 1.8, opacity: 0.9 }}>
                    Randevu akislari, durum guncellemeleri ve operasyon takibi bu
                    panel uzerinden yonetilir.
                  </Typography>

                  <Paper
                    sx={{
                      p: 2,
                      borderRadius: "18px",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "common.white",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <Stack direction="row" spacing={1.2} alignItems="flex-start">
                      <SecurityRoundedIcon sx={{ mt: 0.15 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.4 }}>
                          Demo giris bilgisi
                        </Typography>
                        <Typography variant="body2">username: admin</Typography>
                        <Typography variant="body2">password: admin123</Typography>
                      </Box>
                    </Stack>
                  </Paper>

                  <Box sx={{ mt: "auto" }}>
                    <Button
                      component={RouterLink}
                      to="/"
                      color="inherit"
                      startIcon={<ArrowBackRoundedIcon />}
                      sx={{ px: 0, minHeight: "auto" }}
                    >
                      Siteye Don
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  alignItems: "center",
                  minHeight: "100%",
                }}
              >
                <Stack spacing={2.4} sx={{ width: "100%", maxWidth: 460 }}>
                  <Box>
                    <Typography variant="overline" color="secondary.main">
                      Admin Login
                    </Typography>
                    <Typography variant="h3" sx={{ mt: 0.7 }}>
                      Oturumunuzu baslatin
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      Kullanici adi ve sifre bilgilerinizle giris yaparak admin
                      paneline erisebilirsiniz.
                    </Typography>
                  </Box>

                  {errorMessage ? (
                    <Alert severity="error" sx={{ borderRadius: "16px" }}>
                      {errorMessage}
                    </Alert>
                  ) : null}

                  <TextField
                    fullWidth
                    label="Kullanici Adi"
                    value={formState.username}
                    onChange={handleChange("username")}
                    autoComplete="username"
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Sifre"
                    value={formState.password}
                    onChange={handleChange("password")}
                    autoComplete="current-password"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Giris yapiliyor..." : "Giris Yap"}
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
