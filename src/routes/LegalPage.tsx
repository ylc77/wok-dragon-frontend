import { Link } from 'react-router-dom';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { useCookieConsent } from '../components/useCookieConsent';
import { useLanguage } from '../components/languageContext';
import { legalConfig } from '../data/legal';
import type { LegalPageKey } from '../data/legal';

type LegalPageProps = {
  page: LegalPageKey;
};

const pageTitles = {
  privacy: {
    el: '\u03a0\u03bf\u03bb\u03b9\u03c4\u03b9\u03ba\u03ae \u0391\u03c0\u03bf\u03c1\u03c1\u03ae\u03c4\u03bf\u03c5',
    en: 'Privacy Policy',
  },
  terms: {
    el: '\u038c\u03c1\u03bf\u03b9 \u03a7\u03c1\u03ae\u03c3\u03b7\u03c2',
    en: 'Terms of Service',
  },
  cookies: {
    el: '\u03a0\u03bf\u03bb\u03b9\u03c4\u03b9\u03ba\u03ae Cookies',
    en: 'Cookie Policy',
  },
  cancellation: {
    el: '\u03a0\u03bf\u03bb\u03b9\u03c4\u03b9\u03ba\u03ae \u0391\u03ba\u03cd\u03c1\u03c9\u03c3\u03b7\u03c2',
    en: 'Cancellation Policy',
  },
};

function englishSections(page: LegalPageKey) {
  const shared = [
    {
      title: 'Business details',
      body: `${legalConfig.businessName} operates in ${legalConfig.country}. Address: ${legalConfig.businessAddress}. Contact: ${legalConfig.contactEmail}; ${legalConfig.phone}.`,
    },
    {
      title: 'Service providers',
      body: `We may use trusted service providers to host and operate this website: ${legalConfig.dataProcessors.join(', ')}.`,
    },
    {
      title: 'Retention',
      body: legalConfig.dataRetention,
    },
  ];

  if (page === 'privacy') {
    return [
      {
        title: 'Information we collect',
        body: 'When you submit a reservation request, we collect the details you provide, such as name, phone number, date, time, guests, and notes. We also store basic site preferences such as language and cookie consent.',
      },
      {
        title: 'How we use information',
        body: 'We use reservation information only to respond to your request and help the restaurant confirm availability. This website does not use advertising pixels.',
      },
      ...shared,
      {
        title: 'Your rights',
        body: 'You may contact us to request access, correction, or deletion of personal information connected to your reservation request, subject to applicable law.',
      },
    ];
  }

  if (page === 'terms') {
    return [
      {
        title: 'Website use',
        body: 'This website provides menu, location, contact, and reservation request information for customers. Content may be updated without notice.',
      },
      {
        title: 'Reservations',
        body: 'Submitting a form is a request only. A reservation is not confirmed until the restaurant contacts you directly.',
      },
      {
        title: 'Menu and prices',
        body: 'Menu content and prices are provided for convenience and may change. Please confirm final availability and pricing with the restaurant.',
      },
      ...shared,
    ];
  }

  if (page === 'cookies') {
    return [
      {
        title: 'Cookie categories',
        body: 'Necessary cookies and local storage support language preference, cookie consent, and basic form behavior. Optional third-party content, such as Google Maps, loads only after consent or a direct user action.',
      },
      {
        title: 'Manage preferences',
        body: 'You can accept all optional cookies, reject non-essential cookies, or manage preferences from the cookie banner and this page.',
      },
      ...shared,
    ];
  }

  return [
    {
      title: 'Reservation cancellation',
      body: 'If you need to cancel or change a reservation request, please contact the restaurant by phone as soon as possible.',
    },
    {
      title: 'No online payment',
      body: 'This first version of the website does not process online payments, deposits, or refunds.',
    },
    {
      title: 'Late arrival',
      body: 'Table availability may change if guests arrive late. Please contact the restaurant directly for time changes.',
    },
    ...shared,
  ];
}

function greekSections(page: LegalPageKey) {
  const shared = [
    {
      title: '\u03a3\u03c4\u03bf\u03b9\u03c7\u03b5\u03af\u03b1 \u03b5\u03c0\u03b9\u03c7\u03b5\u03af\u03c1\u03b7\u03c3\u03b7\u03c2',
      body: `${legalConfig.businessName}. \u0394\u03b9\u03b5\u03cd\u03b8\u03c5\u03bd\u03c3\u03b7: ${legalConfig.businessAddress}. Email: ${legalConfig.contactEmail}. \u03a4\u03b7\u03bb\u03ad\u03c6\u03c9\u03bd\u03bf: ${legalConfig.phone}.`,
    },
    {
      title: '\u03a0\u03ac\u03c1\u03bf\u03c7\u03bf\u03b9',
      body: `\u0395\u03bd\u03b4\u03ad\u03c7\u03b5\u03c4\u03b1\u03b9 \u03bd\u03b1 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03bf\u03cd\u03bc\u03b5 \u03c4\u03bf\u03c5\u03c2 \u03b5\u03be\u03ae\u03c2 \u03c0\u03b1\u03c1\u03cc\u03c7\u03bf\u03c5\u03c2: ${legalConfig.dataProcessors.join(', ')}.`,
    },
    {
      title: '\u0394\u03b9\u03b1\u03c4\u03ae\u03c1\u03b7\u03c3\u03b7',
      body: legalConfig.dataRetention,
    },
  ];

  if (page === 'privacy') {
    return [
      {
        title: '\u03a0\u03bf\u03b9\u03b1 \u03c3\u03c4\u03bf\u03b9\u03c7\u03b5\u03af\u03b1 \u03c3\u03c5\u03bb\u03bb\u03ad\u03b3\u03bf\u03c5\u03bc\u03b5',
        body: '\u0393\u03b9\u03b1 \u03b1\u03b9\u03c4\u03ae\u03bc\u03b1\u03c4\u03b1 \u03ba\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7\u03c2 \u03bb\u03b1\u03bc\u03b2\u03ac\u03bd\u03bf\u03c5\u03bc\u03b5 \u03cc\u03bd\u03bf\u03bc\u03b1, \u03c4\u03b7\u03bb\u03ad\u03c6\u03c9\u03bd\u03bf, \u03b7\u03bc\u03b5\u03c1\u03bf\u03bc\u03b7\u03bd\u03af\u03b1, \u03ce\u03c1\u03b1, \u03ac\u03c4\u03bf\u03bc\u03b1 \u03ba\u03b1\u03b9 \u03c3\u03b7\u03bc\u03b5\u03b9\u03ce\u03c3\u03b5\u03b9\u03c2.',
      },
      {
        title: '\u03a7\u03c1\u03ae\u03c3\u03b7',
        body: '\u03a4\u03b1 \u03c3\u03c4\u03bf\u03b9\u03c7\u03b5\u03af\u03b1 \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03bf\u03cd\u03bd\u03c4\u03b1\u03b9 \u03bc\u03cc\u03bd\u03bf \u03b3\u03b9\u03b1 \u03b5\u03c0\u03b9\u03ba\u03bf\u03b9\u03bd\u03c9\u03bd\u03af\u03b1 \u03ba\u03b1\u03b9 \u03b5\u03c0\u03b9\u03b2\u03b5\u03b2\u03b1\u03af\u03c9\u03c3\u03b7 \u03ba\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7\u03c2.',
      },
      ...shared,
    ];
  }

  if (page === 'terms') {
    return [
      {
        title: '\u03a7\u03c1\u03ae\u03c3\u03b7 site',
        body: '\u03a4\u03bf site \u03c0\u03b1\u03c1\u03ad\u03c7\u03b5\u03b9 \u03bc\u03b5\u03bd\u03bf\u03cd, \u03c7\u03ac\u03c1\u03c4\u03b7, \u03b5\u03c0\u03b1\u03c6\u03ae \u03ba\u03b1\u03b9 \u03b1\u03b9\u03c4\u03ae\u03bc\u03b1\u03c4\u03b1 \u03ba\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7\u03c2.',
      },
      {
        title: '\u039a\u03c1\u03b1\u03c4\u03ae\u03c3\u03b5\u03b9\u03c2',
        body: '\u0397 \u03c6\u03cc\u03c1\u03bc\u03b1 \u03b5\u03af\u03bd\u03b1\u03b9 \u03b1\u03af\u03c4\u03b7\u03bc\u03b1. \u0397 \u03ba\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7 \u03b5\u03c0\u03b9\u03b2\u03b5\u03b2\u03b1\u03b9\u03ce\u03bd\u03b5\u03c4\u03b1\u03b9 \u03bc\u03cc\u03bd\u03bf \u03cc\u03c4\u03b1\u03bd \u03c3\u03b1\u03c2 \u03ba\u03b1\u03bb\u03ad\u03c3\u03b5\u03b9 \u03c4\u03bf \u03b5\u03c3\u03c4\u03b9\u03b1\u03c4\u03cc\u03c1\u03b9\u03bf.',
      },
      ...shared,
    ];
  }

  if (page === 'cookies') {
    return [
      {
        title: 'Cookies',
        body: '\u03a4\u03b1 \u03b1\u03c0\u03b1\u03c1\u03b1\u03af\u03c4\u03b7\u03c4\u03b1 cookies \u03ba\u03b1\u03b9 local storage \u03c5\u03c0\u03bf\u03c3\u03c4\u03b7\u03c1\u03af\u03b6\u03bf\u03c5\u03bd \u03b3\u03bb\u03ce\u03c3\u03c3\u03b1, \u03c3\u03c5\u03bd\u03b1\u03af\u03bd\u03b5\u03c3\u03b7 cookies \u03ba\u03b1\u03b9 \u03b2\u03b1\u03c3\u03b9\u03ba\u03ad\u03c2 \u03bb\u03b5\u03b9\u03c4\u03bf\u03c5\u03c1\u03b3\u03af\u03b5\u03c2. \u039f Google Map \u03c6\u03bf\u03c1\u03c4\u03ce\u03bd\u03b5\u03c4\u03b1\u03b9 \u03bc\u03cc\u03bd\u03bf \u03bc\u03b5 \u03c3\u03c5\u03bd\u03b1\u03af\u03bd\u03b5\u03c3\u03b7 \u03ae \u03ba\u03bb\u03b9\u03ba.',
      },
      ...shared,
    ];
  }

  return [
    {
      title: '\u0391\u03ba\u03cd\u03c1\u03c9\u03c3\u03b7',
      body: '\u0393\u03b9\u03b1 \u03b1\u03ba\u03cd\u03c1\u03c9\u03c3\u03b7 \u03ae \u03b1\u03bb\u03bb\u03b1\u03b3\u03ae \u03ba\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7\u03c2, \u03ba\u03b1\u03bb\u03ad\u03c3\u03c4\u03b5 \u03c4\u03bf \u03b5\u03c3\u03c4\u03b9\u03b1\u03c4\u03cc\u03c1\u03b9\u03bf \u03c4\u03bf \u03c3\u03c5\u03bd\u03c4\u03bf\u03bc\u03cc\u03c4\u03b5\u03c1\u03bf.',
    },
    {
      title: '\u03a0\u03bb\u03b7\u03c1\u03c9\u03bc\u03ad\u03c2',
      body: '\u0397 \u03c0\u03c1\u03ce\u03c4\u03b7 \u03ad\u03ba\u03b4\u03bf\u03c3\u03b7 \u03c4\u03bf\u03c5 site \u03b4\u03b5\u03bd \u03b4\u03ad\u03c7\u03b5\u03c4\u03b1\u03b9 online \u03c0\u03bb\u03b7\u03c1\u03c9\u03bc\u03ad\u03c2, \u03c0\u03c1\u03bf\u03ba\u03b1\u03c4\u03b1\u03b2\u03bf\u03bb\u03ad\u03c2 \u03ae refunds.',
    },
    ...shared,
  ];
}

export function LegalPage({ page }: LegalPageProps) {
  const { language } = useLanguage();
  const { accept, reject, reset, status } = useCookieConsent();
  const isGreek = language === 'el';
  const title = pageTitles[page][language];
  const sections = isGreek ? greekSections(page) : englishSections(page);

  return (
    <>
      <section className="legal-page">
        <div className="legal-card">
          <span className="section-kicker">{legalConfig.businessName}</span>
          <h1>{title}</h1>
          <p className="legal-updated">
            {isGreek ? '\u03a4\u03b5\u03bb\u03b5\u03c5\u03c4\u03b1\u03af\u03b1 \u03b5\u03bd\u03b7\u03bc\u03ad\u03c1\u03c9\u03c3\u03b7' : 'Last updated'}: {legalConfig.lastUpdated}
          </p>
          <div className="legal-sections">
            {sections.map((section) => (
              <article key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>

          {page === 'cookies' && (
            <div className="legal-cookie-controls">
              <strong>{isGreek ? '\u03a1\u03c5\u03b8\u03bc\u03af\u03c3\u03b5\u03b9\u03c2 cookies' : 'Cookie preferences'}</strong>
              <span>{isGreek ? '\u03a4\u03c1\u03ad\u03c7\u03bf\u03c5\u03c3\u03b1 \u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae' : 'Current choice'}: {status ?? '-'}</span>
              <div className="privacy-actions">
                <button className="button button-red" type="button" onClick={accept}>
                  {isGreek ? '\u0391\u03c0\u03bf\u03b4\u03bf\u03c7\u03ae \u03cc\u03bb\u03c9\u03bd' : 'Accept all'}
                </button>
                <button className="button button-dark" type="button" onClick={reject}>
                  {isGreek ? '\u0391\u03c0\u03cc\u03c1\u03c1\u03b9\u03c8\u03b7 \u03bc\u03b7 \u03b1\u03c0\u03b1\u03c1\u03b1\u03af\u03c4\u03b7\u03c4\u03c9\u03bd' : 'Reject non-essential'}
                </button>
                <button className="button button-outline" type="button" onClick={reset}>
                  {isGreek ? '\u0394\u03b9\u03b1\u03c7\u03b5\u03af\u03c1\u03b9\u03c3\u03b7 \u03c0\u03c1\u03bf\u03c4\u03b9\u03bc\u03ae\u03c3\u03b5\u03c9\u03bd' : 'Manage preferences'}
                </button>
              </div>
            </div>
          )}

          <Link className="button button-outline legal-back-link" to="/menu">
            {isGreek ? '\u03a0\u03af\u03c3\u03c9 \u03c3\u03c4\u03bf \u03bc\u03b5\u03bd\u03bf\u03cd' : 'Back to menu'}
          </Link>
        </div>
      </section>
      <MobileQuickNav />
    </>
  );
}
