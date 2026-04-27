import aestheticApplicationsCategoryImage from "./aesthetic-applications-category.jpg";
import aestheticApplicationsImage from "./aesthetic-applications.svg";
import bodyShapingCategoryImage from "./body-shaping-category.jpg";
import bodyShapingImage from "./body-shaping.svg";
import hairApplicationsCategoryImage from "./hair-applications-category.jpg";
import hairApplicationsImage from "./hair-applications.svg";
import laserApplicationsCategoryImage from "./laser-applications-category.jpg";
import laserApplicationsImage from "./laser-applications.svg";
import skinCareTreatmentsCategoryImage from "./skin-care-treatments-category.jpg";
import skinCareTreatmentsImage from "./skin-care-treatments.svg";

export const categoryImageMap = {
  "lazer-uygulamalari": laserApplicationsCategoryImage,
  "estetik-uygulamalari": aestheticApplicationsCategoryImage,
  "cilt-bakimi-ve-cilt-problemleri": skinCareTreatmentsCategoryImage,
  "vucut-sekillendirme": bodyShapingCategoryImage,
  "sac-uygulamalari": hairApplicationsCategoryImage,
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
