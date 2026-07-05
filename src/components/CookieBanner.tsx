import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCookieConsent } from './useCookieConsent';
import { useLanguage } from './languageContext';

const copy = {
  el: {
    accept: '\u0391\u03c0\u03bf\u03b4\u03bf\u03c7\u03ae \u03cc\u03bb\u03c9\u03bd',
    body:
      '\u03a7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03bf\u03cd\u03bc\u03b5 \u03b1\u03c0\u03b1\u03c1\u03b1\u03af\u03c4\u03b7\u03c4\u03b1 cookies \u03b3\u03b9\u03b1 \u03c4\u03b7 \u03bb\u03b5\u03b9\u03c4\u03bf\u03c5\u03c1\u03b3\u03af\u03b1 \u03c4\u03bf\u03c5 site. \u039f \u03c7\u03ac\u03c1\u03c4\u03b7\u03c2 Google \u03c6\u03bf\u03c1\u03c4\u03ce\u03bd\u03b5\u03c4\u03b1\u03b9 \u03bc\u03cc\u03bd\u03bf \u03b1\u03bd \u03c4\u03bf \u03b5\u03c0\u03b9\u03bb\u03ad\u03be\u03b5\u03c4\u03b5.',
    manage: '\u0394\u03b9\u03b1\u03c7\u03b5\u03af\u03c1\u03b9\u03c3\u03b7',
    maps: 'Google Maps',
    necessary: '\u0391\u03c0\u03b1\u03c1\u03b1\u03af\u03c4\u03b7\u03c4\u03b1 cookies',
    policy: '\u03a0\u03bf\u03bb\u03b9\u03c4\u03b9\u03ba\u03ae Cookies',
    reject: '\u0391\u03c0\u03cc\u03c1\u03c1\u03b9\u03c8\u03b7 \u03bc\u03b7 \u03b1\u03c0\u03b1\u03c1\u03b1\u03af\u03c4\u03b7\u03c4\u03c9\u03bd',
    save: '\u0391\u03c0\u03bf\u03b8\u03ae\u03ba\u03b5\u03c5\u03c3\u03b7',
    title: 'Cookies & \u03b9\u03b4\u03b9\u03c9\u03c4\u03b9\u03ba\u03cc\u03c4\u03b7\u03c4\u03b1',
  },
  en: {
    accept: 'Accept all',
    body:
      'We use necessary cookies for site features. Google Maps is loaded only if you choose to allow it.',
    manage: 'Manage preferences',
    maps: 'Google Maps',
    necessary: 'Necessary cookies',
    policy: 'Cookie Policy',
    reject: 'Reject non-essential',
    save: 'Save choices',
    title: 'Cookies & Privacy',
  },
};

export function CookieBanner() {
  const { status, accept, reject } = useCookieConsent();
  const { language } = useLanguage();
  const [showPreferences, setShowPreferences] = useState(false);
  const [allowMaps, setAllowMaps] = useState(false);
  const text = copy[language === 'el' ? 'el' : 'en'];

  if (status !== null) return null;

  function savePreferences() {
    if (allowMaps) {
      accept();
      return;
    }

    reject();
  }

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
        <button className="cookie-link-button" type="button" onClick={() => setShowPreferences((current) => !current)}>
          {text.manage}
        </button>
        <Link to="/cookie-policy">{text.policy}</Link>
      </div>
      {showPreferences && (
        <div className="cookie-preferences">
          <label>
            <input checked disabled type="checkbox" />
            <span>{text.necessary}</span>
          </label>
          <label>
            <input checked={allowMaps} type="checkbox" onChange={(event) => setAllowMaps(event.target.checked)} />
            <span>{text.maps}</span>
          </label>
          <button className="button button-red" type="button" onClick={savePreferences}>
            {text.save}
          </button>
        </div>
      )}
    </section>
  );
}
