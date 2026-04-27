import { Container, Grid, Paper, Typography } from "@mui/material";

export function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
      <Typography variant="overline" color="secondary.main">
        Hakkimizda
      </Typography>
      <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
        Zarif, guven veren ve sade bir marka anlatimi
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 720 }}>
        Bu alan, merkezin yaklasimini, hizmet felsefesini ve danisan deneyimi
        odagini acik bir dille sunmak icin hazirlandi.
      </Typography>
      <Grid container spacing={3}>
        {["Yaklasim", "Deneyim", "Bakim Sureci"].map((title) => (
          <Grid item xs={12} md={4} key={title}>
            <Paper sx={{ p: 3.5, borderRadius: 5, height: "100%" }}>
              <Typography variant="h5" sx={{ mb: 1.5 }}>
                {title}
              </Typography>
              <Typography color="text.secondary">
                Icerik metinleri sonraki asamada marka diline uygun sekilde
                detaylandirilacaktir.
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

