import { Link } from 'react-router-dom';
import { MapContactSection } from '../components/MapContactSection';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { ReservationSection } from '../components/ReservationSection';
import { useLanguage } from '../components/languageContext';

export function ReservationPage() {
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <>
      <section className="booking-hero">
        <div className="booking-hero-inner">
          <Link className="booking-breadcrumb" to="/menu">
            {isGreek ? 'Δείτε το μενού' : 'View menu'}
          </Link>
          <h1>{isGreek ? 'Κράτηση τραπεζιού' : 'Book a Table'}</h1>
          <p>
            {isGreek
              ? 'Στείλτε μας το αίτημα κράτησης. Θα επικοινωνήσουμε μαζί σας για επιβεβαίωση.'
              : 'Send us your reservation request. We will contact you to confirm.'}
          </p>
        </div>
      </section>
      <ReservationSection />
      <MapContactSection mode="compact" />
      <MobileQuickNav />
    </>
  );
}
