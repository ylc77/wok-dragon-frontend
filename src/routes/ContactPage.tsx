import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { contactInfo } from '../data/contact';
import { useLanguage } from '../components/languageContext';

export function ContactPage() {
  const { language } = useLanguage();
  const isGreek = language === 'el';
  const phoneHref = contactInfo.phone ? `tel:${contactInfo.phone.replace(/\s/g, '')}` : '';

  return (
    <>
      <section className="reservation-hero page-hero-contact">
        <span className="section-kicker">{isGreek ? 'Επικοινωνία' : 'Contact'}</span>
        <h1>{isGreek ? 'Μιλήστε με το Wok Dragon' : 'Contact Wok Dragon'}</h1>
        <p>
          {isGreek
            ? 'Για κρατήσεις, ερωτήσεις ή πληροφορίες, επικοινωνήστε απευθείας με το εστιατόριο.'
            : 'For bookings, questions, or visit details, contact the restaurant directly.'}
        </p>
      </section>

      <section className="contact-page">
        <div className="contact-card-large">
          <h2>{isGreek ? 'Στοιχεία επικοινωνίας' : 'Contact Details'}</h2>
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
              {isGreek ? 'Κράτηση' : 'Book a Table'}
            </Link>
            <Link className="button button-outline" to="/location">
              {isGreek ? 'Δείτε τον χάρτη' : 'View Map'}
            </Link>
          </div>
        </div>
      </section>
      <MobileQuickNav />
    </>
  );
}
