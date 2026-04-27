import aestheticApplicationsImage from "./aesthetic-applications.svg";
import bodyShapingImage from "./body-shaping.svg";
import hairApplicationsImage from "./hair-applications.svg";
import laserApplicationsImage from "./laser-applications.svg";
import skinCareTreatmentsImage from "./skin-care-treatments.svg";

export const categoryImageMap = {
  "lazer-uygulamalari": laserApplicationsImage,
  "estetik-uygulamalari": aestheticApplicationsImage,
  "cilt-bakimi-ve-cilt-problemleri": skinCareTreatmentsImage,
  "vucut-sekillendirme": bodyShapingImage,
  "sac-uygulamalari": hairApplicationsImage,
} as const;

export const serviceImageMap = {
  "lazer-epilasyon": laserApplicationsImage,
  "dovme-sildirme": laserApplicationsImage,
  "lazer-cilt-uygulamalari": laserApplicationsImage,
  "dudak-dolgusu": aestheticApplicationsImage,
  "dolgu-tedavileri": aestheticApplicationsImage,
  "ameliyatsiz-estetik-uygulamalari": aestheticApplicationsImage,
  "leke-tedavileri": skinCareTreatmentsImage,
  "sivilce-tedavisi": skinCareTreatmentsImage,
  "medikal-cilt-bakimi": skinCareTreatmentsImage,
  "bolgesel-incelme": bodyShapingImage,
  "vucut-sekillendirme": bodyShapingImage,
  "selulit-bakimi": bodyShapingImage,
  "sac-ekimi": hairApplicationsImage,
  "sac-mezoterapisi": hairApplicationsImage,
  "prp-sac-uygulamalari": hairApplicationsImage,
} as const;
