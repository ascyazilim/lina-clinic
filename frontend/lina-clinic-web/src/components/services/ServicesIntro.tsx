import BlurOnRoundedIcon from "@mui/icons-material/BlurOnRounded";
import FaceRetouchingNaturalRoundedIcon from "@mui/icons-material/FaceRetouchingNaturalRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const serviceGroups = [
  {
    title: "Lazer ve cilt odakli uygulamalar",
    icon: <BlurOnRoundedIcon color="secondary" />,
  },
  {
    title: "Estetik planlama basliklari",
    icon: <FaceRetouchingNaturalRoundedIcon color="secondary" />,
  },
  {
    title: "Bakim ve deneyim surecleri",
    icon: <SpaRoundedIcon color="secondary" />,
  },
];

export function ServicesIntro() {
  return (
    <Grid container spacing={3}>
      {serviceGroups.map((group) => (
        <Grid item xs={12} md={4} key={group.title}>
          <Card sx={{ height: "100%", borderRadius: 5 }}>
            <CardContent sx={{ p: 3.5 }}>
              <Stack spacing={2}>
                {group.icon}
                <Typography variant="h5">{group.title}</Typography>
                <Typography color="text.secondary">
                  Gercek listeleme ve API entegrasyonu sonraki adimda bu alanlarla
                  birlestirilecek.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

