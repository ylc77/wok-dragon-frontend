import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { contactInfo } from '../data/contact';
import { useLanguage } from './languageContext';
import { useCookieConsent } from './useCookieConsent';

type MapContactSectionProps = {
  mode?: 'full' | 'map' | 'compact';
};

const copy = {
  el: {
    kicker: 'Χάρτης',
    contactTitle: 'Επικοινωνία Wok Dragon',
    locationTitle: 'Τοποθεσία Wok Dragon',
    openMap: 'Άνοιγμα στο Google Maps',
    loadMap: 'Φόρτωση Google Map',
    mapTitle: 'Χάρτης Google',
    mapBody: 'Ο χάρτης Google φορτώνει υλικό από τρίτο πάροχο.',
    mapRejected: 'Απορρίψατε τα προαιρετικά cookies. Μπορείτε ακόμη να φορτώσετε τον χάρτη αν το θέλετε.',
  },
  en: {
    kicker: 'Find Us',
    contactTitle: 'Contact Wok Dragon',
    locationTitle: 'Wok Dragon Location',
    openMap: 'Open in Google Maps',
    loadMap: 'Load Google Map',
    mapTitle: 'Google Map',
    mapBody: 'Google Maps loads content from a third-party provider.',
    mapRejected: 'You rejected optional cookies. You can still load the map if you want to view it here.',
  },
  zh: {
    kicker: '地图',
    contactTitle: '联系龙城酒楼',
    locationTitle: '龙城酒楼地址',
    openMap: '打开 Google 地图',
    loadMap: '加载 Google 地图',
    mapTitle: 'Google 地图',
    mapBody: 'Google 地图会加载第三方内容。',
    mapRejected: '你已拒绝非必要 Cookie。如需在页面内查看地图，仍可手动加载。',
  },
};

export function MapContactSection({ mode = 'full' }: MapContactSectionProps) {
  const { language } = useLanguage();
  const { status, accept } = useCookieConsent();
  const text = copy[language];
  const canLoadMap = status === 'accepted';

  return (
    <section className={`map-contact map-contact-${mode}`} id="location">
      <div className="contact-panel" id="contact">
        <span className="section-kicker">{text.kicker}</span>
        <h2>{mode === 'map' ? text.locationTitle : text.contactTitle}</h2>
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
          {text.openMap}
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
            <p>{status === 'rejected' ? text.mapRejected : text.mapBody}</p>
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
