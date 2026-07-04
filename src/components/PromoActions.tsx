import { Link } from 'react-router-dom';
import { useLanguage } from './languageContext';

const actions = [
  {
    titleEn: 'Our Menu',
    titleEl: 'Το μενού μας',
    textEn: 'Explore wok dishes, noodles, rice bowls, starters, and drinks.',
    textEl: 'Δείτε πιάτα wok, noodles, ρύζι, ορεκτικά και ποτά.',
    href: '/menu',
  },
  {
    titleEn: 'Book a Table',
    titleEl: 'Κράτηση τραπεζιού',
    textEn: 'Send a quick reservation request and the restaurant will confirm by phone.',
    textEl: 'Στείλτε γρήγορα αίτημα κράτησης και το εστιατόριο θα επιβεβαιώσει τηλεφωνικά.',
    href: '/reservation',
  },
  {
    titleEn: 'Find Us',
    titleEl: 'Βρείτε μας',
    textEn: 'Check the address, contact details, and map before you visit.',
    textEl: 'Δείτε τη διεύθυνση, τα στοιχεία επικοινωνίας και τον χάρτη πριν την επίσκεψη.',
    href: '/location',
  },
];

export function PromoActions() {
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <section className="promo-actions" aria-label="Quick actions">
      {actions.map((action) => (
        <article key={action.titleEn} className="promo-card">
          <h3>{isGreek ? action.titleEl : action.titleEn}</h3>
          <p>{isGreek ? action.textEl : action.textEn}</p>
          <Link className="button button-light" to={action.href}>
            {isGreek ? 'Συνέχεια' : 'Continue'}
          </Link>
        </article>
      ))}
    </section>
  );
}
