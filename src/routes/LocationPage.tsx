import { MapContactSection } from '../components/MapContactSection';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { contactInfo } from '../data/contact';
import { useLanguage } from '../components/languageContext';

export function LocationPage() {
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <>
      <section className="reservation-hero page-hero-location">
        <span className="section-kicker">{isGreek ? 'Χάρτης' : 'Find Us'}</span>
        <h1>{isGreek ? 'Βρείτε το Wok Dragon' : 'Find Wok Dragon'}</h1>
        <p>
          {isGreek
            ? `Επισκεφθείτε μας στη διεύθυνση ${contactInfo.address}.`
            : `Visit us at ${contactInfo.address}.`}
        </p>
      </section>
      <MapContactSection mode="map" />
      <MobileQuickNav />
    </>
  );
}
