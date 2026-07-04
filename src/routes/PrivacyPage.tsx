import { Link } from 'react-router-dom';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { useCookieConsent } from '../components/useCookieConsent';
import { useLanguage } from '../components/languageContext';

const text = {
  el: {
    accept: '\u0391\u03c0\u03bf\u03b4\u03bf\u03c7\u03ae',
    back: '\u0395\u03c0\u03b9\u03c3\u03c4\u03c1\u03bf\u03c6\u03ae \u03c3\u03c4\u03bf \u03bc\u03b5\u03bd\u03bf\u03cd',
    body:
      '\u03a4\u03bf Wok Dragon \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03b5\u03af \u03b1\u03c0\u03bb\u03ac \u03b1\u03c0\u03b1\u03c1\u03b1\u03af\u03c4\u03b7\u03c4\u03b1 \u03c4\u03bf\u03c0\u03b9\u03ba\u03ac \u03b4\u03b5\u03b4\u03bf\u03bc\u03ad\u03bd\u03b1 \u03b3\u03b9\u03b1 \u03b3\u03bb\u03ce\u03c3\u03c3\u03b1, \u03c6\u03cc\u03c1\u03bc\u03b5\u03c2 \u03ba\u03b1\u03b9 \u03b2\u03b1\u03c3\u03b9\u03ba\u03ae \u03bb\u03b5\u03b9\u03c4\u03bf\u03c5\u03c1\u03b3\u03af\u03b1. \u0394\u03b5\u03bd \u03c0\u03c1\u03bf\u03c3\u03b8\u03ad\u03c4\u03bf\u03c5\u03bc\u03b5 Google Analytics \u03ae \u03b4\u03b9\u03b1\u03c6\u03b7\u03bc\u03b9\u03c3\u03c4\u03b9\u03ba\u03ac pixels.',
    maps:
      '\u039f \u03b5\u03bd\u03c3\u03c9\u03bc\u03b1\u03c4\u03c9\u03bc\u03ad\u03bd\u03bf\u03c2 \u03c7\u03ac\u03c1\u03c4\u03b7\u03c2 Google \u03c6\u03bf\u03c1\u03c4\u03ce\u03bd\u03b5\u03c4\u03b1\u03b9 \u03bc\u03cc\u03bd\u03bf \u03b1\u03bd \u03c4\u03bf\u03bd \u03b5\u03c0\u03b9\u03bb\u03ad\u03be\u03b5\u03c4\u03b5 \u03ae \u03b1\u03bd \u03c0\u03b1\u03c4\u03ae\u03c3\u03b5\u03c4\u03b5 \u0391\u03c0\u03bf\u03b4\u03bf\u03c7\u03ae.',
    reject: '\u0391\u03c0\u03cc\u03c1\u03c1\u03b9\u03c8\u03b7',
    reset: '\u0395\u03c0\u03b1\u03bd\u03b1\u03c6\u03bf\u03c1\u03ac \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae\u03c2',
    status: '\u03a4\u03c1\u03ad\u03c7\u03bf\u03c5\u03c3\u03b1 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae',
    title: '\u0399\u03b4\u03b9\u03c9\u03c4\u03b9\u03ba\u03cc\u03c4\u03b7\u03c4\u03b1 & Cookies',
  },
  en: {
    accept: 'Accept',
    back: 'Back to menu',
    body:
      'Wok Dragon uses only simple local data for language preference, forms, and basic site features. We do not add Google Analytics or advertising pixels.',
    maps:
      'The embedded Google Map is loaded only if you choose to load it or accept optional cookies.',
    reject: 'Reject',
    reset: 'Reset choice',
    status: 'Current choice',
    title: 'Privacy & Cookies',
  },
};

export function PrivacyPage() {
  const { language } = useLanguage();
  const { status, accept, reject, reset } = useCookieConsent();
  const copy = text[language];

  return (
    <>
      <section className="privacy-page">
        <div className="privacy-card">
          <span className="section-kicker">{copy.title}</span>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>
          <p>{copy.maps}</p>
          <div className="privacy-status">
            <strong>{copy.status}</strong>
            <span>{status ?? '-'}</span>
          </div>
          <div className="privacy-actions">
            <button className="button button-red" type="button" onClick={accept}>
              {copy.accept}
            </button>
            <button className="button button-dark" type="button" onClick={reject}>
              {copy.reject}
            </button>
            <button className="button button-outline" type="button" onClick={reset}>
              {copy.reset}
            </button>
            <Link className="button button-outline" to="/menu">
              {copy.back}
            </Link>
          </div>
        </div>
      </section>
      <MobileQuickNav />
    </>
  );
}
