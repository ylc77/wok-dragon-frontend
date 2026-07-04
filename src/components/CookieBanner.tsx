import { Link } from 'react-router-dom';
import { useCookieConsent } from './useCookieConsent';
import { useLanguage } from './languageContext';

const copy = {
  el: {
    accept: '\u0391\u03c0\u03bf\u03b4\u03bf\u03c7\u03ae',
    body:
      '\u03a7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03bf\u03cd\u03bc\u03b5 \u03b1\u03c0\u03b1\u03c1\u03b1\u03af\u03c4\u03b7\u03c4\u03b1 cookies \u03b3\u03b9\u03b1 \u03c4\u03b7 \u03bb\u03b5\u03b9\u03c4\u03bf\u03c5\u03c1\u03b3\u03af\u03b1 \u03c4\u03bf\u03c5 site. \u039f \u03c7\u03ac\u03c1\u03c4\u03b7\u03c2 Google \u03c6\u03bf\u03c1\u03c4\u03ce\u03bd\u03b5\u03c4\u03b1\u03b9 \u03bc\u03cc\u03bd\u03bf \u03b1\u03bd \u03c4\u03bf \u03b5\u03c0\u03b9\u03bb\u03ad\u03be\u03b5\u03c4\u03b5.',
    policy: '\u0399\u03b4\u03b9\u03c9\u03c4\u03b9\u03ba\u03cc\u03c4\u03b7\u03c4\u03b1',
    reject: '\u0391\u03c0\u03cc\u03c1\u03c1\u03b9\u03c8\u03b7',
    title: 'Cookies & \u03b9\u03b4\u03b9\u03c9\u03c4\u03b9\u03ba\u03cc\u03c4\u03b7\u03c4\u03b1',
  },
  en: {
    accept: 'Accept',
    body:
      'We use necessary cookies for site features. Google Maps is loaded only if you choose to allow it.',
    policy: 'Privacy',
    reject: 'Reject',
    title: 'Cookies & Privacy',
  },
};

export function CookieBanner() {
  const { status, accept, reject } = useCookieConsent();
  const { language } = useLanguage();
  const text = copy[language];

  if (status !== null) return null;

  return (
    <section className="cookie-banner" aria-label={text.title}>
      <div>
        <strong>{text.title}</strong>
        <p>{text.body}</p>
      </div>
      <div className="cookie-banner-actions">
        <button className="button button-red" type="button" onClick={accept}>
          {text.accept}
        </button>
        <button className="button button-dark" type="button" onClick={reject}>
          {text.reject}
        </button>
        <Link to="/privacy">{text.policy}</Link>
      </div>
    </section>
  );
}
