import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { contactInfo } from '../data/contact';
import { getSeoRoute, siteUrl } from '../data/seo';
import { useLanguage } from './languageContext';

const languageAttributes = { el: 'el', en: 'en', zh: 'zh-CN' } as const;

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function Seo() {
  const { language } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoRoute(pathname);
    const canonicalPath = pathname === '/book' ? '/reservation' : pathname === '/privacy' ? '/privacy-policy' : pathname;
    const canonicalUrl = `${siteUrl}${canonicalPath === '/' ? '/' : canonicalPath}`;
    const imageUrl = `${siteUrl}/brand/wok-dragon-logo.png`;

    document.documentElement.lang = languageAttributes[language];
    document.title = seo.title[language];
    setMeta('name', 'description', seo.description[language]);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'Wok Dragon Express');
    setMeta('property', 'og:title', seo.title[language]);
    setMeta('property', 'og:description', seo.description[language]);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:locale', language === 'el' ? 'el_GR' : language === 'zh' ? 'zh_CN' : 'en_GB');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title[language]);
    setMeta('name', 'twitter:description', seo.description[language]);
    setMeta('name', 'twitter:image', imageUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      '@id': `${siteUrl}/#restaurant`,
      name: 'Wok Dragon Express',
      url: siteUrl,
      image: imageUrl,
      telephone: contactInfo.phone,
      priceRange: '€€',
      servesCuisine: ['Chinese', 'Asian'],
      menu: `${siteUrl}/menu`,
      acceptsReservations: true,
      address: { '@type': 'PostalAddress', streetAddress: 'Mitropoleos 51', addressLocality: 'Athens', postalCode: '105 56', addressCountry: 'GR' },
      geo: { '@type': 'GeoCoordinates', latitude: 37.9759663, longitude: 23.7277905 },
      openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '12:00', closes: '23:30' },
      sameAs: contactInfo.googleMapsUrl ? [contactInfo.googleMapsUrl] : undefined,
      potentialAction: { '@type': 'ReserveAction', target: `${siteUrl}/reservation` },
      availableLanguage: ['el', 'en', 'zh'],
    };

    let schemaElement = document.getElementById('restaurant-structured-data') as HTMLScriptElement | null;
    if (!schemaElement) {
      schemaElement = document.createElement('script');
      schemaElement.id = 'restaurant-structured-data';
      schemaElement.type = 'application/ld+json';
      document.head.appendChild(schemaElement);
    }
    schemaElement.textContent = JSON.stringify(schema);
  }, [language, pathname]);

  return null;
}
