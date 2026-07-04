import { FloatingFoodShowcase } from '../components/FloatingFoodShowcase';
import { HeroCollage } from '../components/HeroCollage';
import { MapContactSection } from '../components/MapContactSection';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { PromoActions } from '../components/PromoActions';
import { ReasonSection } from '../components/ReasonSection';

export function HomePage() {
  return (
    <>
      <HeroCollage />
      <ReasonSection />
      <FloatingFoodShowcase />
      <PromoActions />
      <MapContactSection />
      <MobileQuickNav />
    </>
  );
}
