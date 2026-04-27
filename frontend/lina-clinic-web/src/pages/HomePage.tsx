import { AppointmentCta } from "../components/home/AppointmentCta";
import { HeroSection } from "../components/home/HeroSection";
import { HomeHighlights } from "../components/home/HomeHighlights";
import { ServicesShowcase } from "../components/home/ServicesShowcase";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeHighlights />
      <ServicesShowcase />
      <AppointmentCta />
    </>
  );
}

