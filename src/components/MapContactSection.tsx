import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo } from '../data/contact';
import { useLanguage } from './languageContext';

type MapContactSectionProps = {
  mode?: 'full' | 'map' | 'compact';
};

export function MapContactSection({ mode = 'full' }: MapContactSectionProps) {
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <section className={`map-contact map-contact-${mode}`} id="location">
      <div className="contact-panel" id="contact">
        <span className="section-kicker">{isGreek ? 'Χάρτης' : 'Find Us'}</span>
        <h2>
          {mode === 'map'
            ? isGreek
              ? 'Τοποθεσία Wok Dragon'
              : 'Wok Dragon Location'
            : isGreek
              ? 'Επικοινωνία Wok Dragon'
              : 'Contact Wok Dragon'}
        </h2>
        <ul>
          {contactInfo.address && (
            <li>
              <MapPin size={18} />
              <span>{contactInfo.address}</span>
            </li>
          )}
          {contactInfo.phone && (
            <li>
              <Phone size={18} />
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a>
            </li>
          )}
          {contactInfo.email && (
            <li>
              <Mail size={18} />
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
          )}
          {contactInfo.openingHours?.length ? (
            <li>
              <Clock size={18} />
              <span>{contactInfo.openingHours.join(' / ')}</span>
            </li>
          ) : null}
        </ul>
        <a
          className="button button-red map-link-button"
          href={contactInfo.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          {isGreek ? 'Άνοιγμα στο Google Maps' : 'Open in Google Maps'}
        </a>
      </div>
      <iframe
        title="Wok Dragon map"
        src={contactInfo.googleMapsEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
