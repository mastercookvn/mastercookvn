import { FeaturedDishes } from "../components/featured/FeaturedDishes";
import { FeaturedMenuSets } from "../components/featured/FeaturedMenuSets";
import { BookingSteps } from "../components/guide/BookingSteps";
import { CallToActionBanner } from "../components/guide/CallToActionBanner";
import { EventTypeList } from "../components/guide/EventTypeList";
import { FactsBar } from "../components/hero/FactsBar";
import { HeroSection } from "../components/hero/HeroSection";
import { ServiceJourney } from "../components/journey/ServiceJourney";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FactsBar />
      <FeaturedMenuSets />
      <ServiceJourney />
      <FeaturedDishes />
      <BookingSteps />
      <EventTypeList />
      <CallToActionBanner />
    </>
  );
}
