import { Link } from 'react-router-dom';
import { useLanguage } from './languageContext';

export function ReasonSection() {
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <section className="reason-section">
      <div className="section-kicker">
        {isGreek ? '\u03a6\u03c1\u03ad\u03c3\u03ba\u03bf wok. \u0388\u03bd\u03c4\u03bf\u03bd\u03b7 \u03b3\u03b5\u03cd\u03c3\u03b7.' : 'Fresh wok. Bold taste.'}
      </div>
      <h2>
        {isGreek
          ? '\u03a0\u03ac\u03bd\u03c4\u03b1 \u03c5\u03c0\u03ac\u03c1\u03c7\u03b5\u03b9 \u03bb\u03cc\u03b3\u03bf\u03c2 \u03b3\u03b9\u03b1 Wok'
          : 'There is Always a Reason to Wok'}
      </h2>
      <p>
        {isGreek
          ? '\u0394\u03c5\u03bd\u03b1\u03c4\u03ae \u03c6\u03c9\u03c4\u03b9\u03ac, \u03c6\u03c1\u03ad\u03c3\u03ba\u03b1 \u03bb\u03b1\u03c7\u03b1\u03bd\u03b9\u03ba\u03ac, \u03c0\u03bb\u03bf\u03cd\u03c3\u03b9\u03b5\u03c2 \u03c3\u03ac\u03bb\u03c4\u03c3\u03b5\u03c2 \u03ba\u03b1\u03b9 \u03b1\u03c3\u03b9\u03b1\u03c4\u03b9\u03ba\u03ad\u03c2 \u03b3\u03b5\u03cd\u03c3\u03b5\u03b9\u03c2 \u03b3\u03b9\u03b1 \u03b3\u03c1\u03ae\u03b3\u03bf\u03c1\u03bf lunch \u03ae \u03b2\u03c1\u03b1\u03b4\u03b9\u03bd\u03cc \u03bc\u03b5 \u03c0\u03b1\u03c1\u03ad\u03b1.'
          : 'Fast flames, bright vegetables, rich sauces, and Asian-inspired comfort made for quick lunches, casual dinners, and table-sharing nights.'}
      </p>
      <p className="greek-line">
        {isGreek
          ? 'Fresh flavors, bold aromas, and Asian dishes for every moment.'
          : '\u03a6\u03c1\u03ad\u03c3\u03ba\u03b5\u03c2 \u03b3\u03b5\u03cd\u03c3\u03b5\u03b9\u03c2, \u03ad\u03bd\u03c4\u03bf\u03bd\u03b1 \u03b1\u03c1\u03ce\u03bc\u03b1\u03c4\u03b1 \u03ba\u03b1\u03b9 \u03b1\u03c3\u03b9\u03b1\u03c4\u03b9\u03ba\u03ac \u03c0\u03b9\u03ac\u03c4\u03b1 \u03b3\u03b9\u03b1 \u03ba\u03ac\u03b8\u03b5 \u03c3\u03c4\u03b9\u03b3\u03bc\u03ae.'}
      </p>
      <div className="reason-actions">
        <Link className="button button-red book-table-button" to="/reservation">
          {isGreek ? '\u039a\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7 \u03c4\u03c1\u03b1\u03c0\u03b5\u03b6\u03b9\u03bf\u03cd' : 'Book a Table'}
        </Link>
        <a className="button button-outline" href="#location">
          {isGreek ? '\u0392\u03c1\u03b5\u03af\u03c4\u03b5 \u03bc\u03b1\u03c2' : 'Find Us'}
        </a>
      </div>
    </section>
  );
}
