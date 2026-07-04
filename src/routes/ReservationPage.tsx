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
            {isGreek ? '\u0394\u03b5\u03af\u03c4\u03b5 \u03c4\u03bf \u03bc\u03b5\u03bd\u03bf\u03cd' : 'View menu'}
          </Link>
          <h1>{isGreek ? '\u039a\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7 \u03c4\u03c1\u03b1\u03c0\u03b5\u03b6\u03b9\u03bf\u03cd' : 'Book a Table'}</h1>
          <p>
            {isGreek
              ? '\u03a3\u03c4\u03b5\u03af\u03bb\u03c4\u03b5 \u03bc\u03b1\u03c2 \u03c4\u03bf \u03b1\u03af\u03c4\u03b7\u03bc\u03b1 \u03ba\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7\u03c2. \u0398\u03b1 \u03b5\u03c0\u03b9\u03ba\u03bf\u03b9\u03bd\u03c9\u03bd\u03ae\u03c3\u03bf\u03c5\u03bc\u03b5 \u03bc\u03b1\u03b6\u03af \u03c3\u03b1\u03c2 \u03b3\u03b9\u03b1 \u03b5\u03c0\u03b9\u03b2\u03b5\u03b2\u03b1\u03af\u03c9\u03c3\u03b7.'
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
