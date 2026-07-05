import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { useLanguage } from '../components/languageContext';
import { contactInfo } from '../data/contact';

const copy = {
  el: {
    kicker: 'Επικοινωνία',
    title: 'Μιλήστε με το Wok Dragon',
    body: 'Για κρατήσεις, ερωτήσεις ή πληροφορίες, επικοινωνήστε απευθείας με το εστιατόριο.',
    details: 'Στοιχεία επικοινωνίας',
    book: 'Κράτηση',
    map: 'Δείτε τον χάρτη',
  },
  en: {
    kicker: 'Contact',
    title: 'Contact Wok Dragon',
    body: 'For bookings, questions, or visit details, contact the restaurant directly.',
    details: 'Contact Details',
    book: 'Book a Table',
    map: 'View Map',
  },
  zh: {
    kicker: '联系',
    title: '联系 Wok Dragon',
    body: '如需预约、咨询菜单或了解地址，请直接联系餐厅。',
    details: '联系方式',
    book: '预约餐桌',
    map: '查看地图',
  },
};

export function ContactPage() {
  const { language } = useLanguage();
  const text = copy[language];
  const phoneHref = contactInfo.phone ? `tel:${contactInfo.phone.replace(/\s/g, '')}` : '';

  return (
    <>
      <section className="reservation-hero page-hero-contact">
        <span className="section-kicker">{text.kicker}</span>
        <h1>{text.title}</h1>
        <p>{text.body}</p>
      </section>

      <section className="contact-page">
        <div className="contact-card-large">
          <h2>{text.details}</h2>
          <ul>
            <li>
              <MapPin size={22} />
              <span>{contactInfo.address}</span>
            </li>
            {contactInfo.phone && (
              <li>
                <Phone size={22} />
                <a href={phoneHref}>{contactInfo.phone}</a>
              </li>
            )}
            {contactInfo.email && (
              <li>
                <Mail size={22} />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>
            )}
            {contactInfo.openingHours?.length ? (
              <li>
                <Clock size={22} />
                <span>{contactInfo.openingHours.join(' / ')}</span>
              </li>
            ) : null}
          </ul>
          <div className="contact-actions">
            <Link className="button button-red" to="/reservation">
              {text.book}
            </Link>
            <Link className="button button-outline" to="/location">
              {text.map}
            </Link>
          </div>
        </div>
      </section>
      <MobileQuickNav />
    </>
  );
}
