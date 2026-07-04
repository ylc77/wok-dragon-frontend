import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo } from '../data/contact';
import { useCookieConsent } from './useCookieConsent';
import { useLanguage } from './languageContext';

type MapContactSectionProps = {
  mode?: 'full' | 'map' | 'compact';
};

export function MapContactSection({ mode = 'full' }: MapContactSectionProps) {
  const { language } = useLanguage();
  const { status, accept } = useCookieConsent();
  const isGreek = language === 'el';
  const canLoadMap = status === 'accepted';

  const text = isGreek
    ? {
        loadMap: '\u03a6\u03cc\u03c1\u03c4\u03c9\u03c3\u03b7 Google Map',
        mapBody:
          status === 'rejected'
            ? '\u0391\u03c0\u03bf\u03c1\u03c1\u03af\u03c8\u03b1\u03c4\u03b5 \u03c4\u03b1 \u03c0\u03c1\u03bf\u03b1\u03b9\u03c1\u03b5\u03c4\u03b9\u03ba\u03ac cookies. \u039c\u03c0\u03bf\u03c1\u03b5\u03af\u03c4\u03b5 \u03bd\u03b1 \u03c6\u03bf\u03c1\u03c4\u03ce\u03c3\u03b5\u03c4\u03b5 \u03c4\u03bf\u03bd \u03c7\u03ac\u03c1\u03c4\u03b7 \u03b1\u03bd \u03c4\u03bf \u03b8\u03ad\u03bb\u03b5\u03c4\u03b5.'
            : '\u039f \u03c7\u03ac\u03c1\u03c4\u03b7\u03c2 Google \u03c6\u03bf\u03c1\u03c4\u03ce\u03bd\u03b5\u03b9 \u03c5\u03bb\u03b9\u03ba\u03cc \u03b1\u03c0\u03cc \u03c4\u03c1\u03af\u03c4\u03bf \u03c0\u03ac\u03c1\u03bf\u03c7\u03bf.',
        mapTitle: '\u03a7\u03ac\u03c1\u03c4\u03b7\u03c2 Google',
        openMap: '\u0386\u03bd\u03bf\u03b9\u03b3\u03bc\u03b1 \u03c3\u03c4\u03bf Google Maps',
      }
    : {
        loadMap: 'Load Google Map',
        mapBody:
          status === 'rejected'
            ? 'You rejected optional cookies. You can still load the map if you want to view it here.'
            : 'Google Maps loads content from a third-party provider.',
        mapTitle: 'Google Map',
        openMap: 'Open in Google Maps',
      };

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
      {canLoadMap ? (
        <iframe
          title="Wok Dragon map"
          src={contactInfo.googleMapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="map-consent-placeholder">
          <div>
            <MapPin size={34} />
            <h3>{text.mapTitle}</h3>
            <p>{text.mapBody}</p>
            <div className="map-consent-actions">
              <button className="button button-red" type="button" onClick={accept}>
                {text.loadMap}
              </button>
              <a className="button button-outline" href={contactInfo.googleMapsUrl} target="_blank" rel="noreferrer">
                {text.openMap}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
