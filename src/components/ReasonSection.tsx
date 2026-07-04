import { Link } from 'react-router-dom';
import { useLanguage } from './languageContext';

export function ReasonSection() {
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <section className="reason-section">
      <div className="section-kicker">{isGreek ? 'Φρέσκο wok. Έντονη γεύση.' : 'Fresh wok. Bold taste.'}</div>
      <h2>{isGreek ? 'Πάντα υπάρχει λόγος για Wok' : 'There is Always a Reason to Wok'}</h2>
      <p>
        {isGreek
          ? 'Δυνατή φωτιά, φρέσκα λαχανικά, πλούσιες σάλτσες και ασιατικές γεύσεις για γρήγορο lunch ή βραδινό με παρέα.'
          : 'Fast flames, bright vegetables, rich sauces, and Asian-inspired comfort made for quick lunches, casual dinners, and table-sharing nights.'}
      </p>
      <p className="greek-line">
        {isGreek
          ? 'Fresh flavors, bold aromas, and Asian dishes for every moment.'
          : 'Φρέσκες γεύσεις, έντονα αρώματα και ασιατικά πιάτα για κάθε στιγμή.'}
      </p>
      <div className="reason-actions">
        <Link className="button button-red book-table-button" to="/reservation">
          {isGreek ? 'Κράτηση τραπεζιού' : 'Book a Table'}
        </Link>
        <a className="button button-outline" href="#location">
          {isGreek ? 'Βρείτε μας' : 'Find Us'}
        </a>
      </div>
    </section>
  );
}
