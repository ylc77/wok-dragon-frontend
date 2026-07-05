import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { useLanguage } from './languageContext';
import { Logo } from './Logo';

const copy = {
  el: {
    slogan: site.sloganEl,
    small: 'Φρέσκα wok πιάτα, noodles, ρύζι, θαλασσινά, ποτά και γρήγορες κρατήσεις στην Αθήνα.',
    privacy: 'Πολιτική Απορρήτου',
    terms: 'Όροι Χρήσης',
    cookies: 'Πολιτική Cookies',
    contact: 'Επικοινωνία',
    cancellation: 'Πολιτική Ακυρώσεων',
  },
  en: {
    slogan: site.sloganEn,
    small: 'Fresh wok dishes, noodles, rice, seafood, drinks, and quick table requests in Athens.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
    contact: 'Contact',
    cancellation: 'Cancellation Policy',
  },
  zh: {
    slogan: site.sloganZh,
    small: '雅典的现炒热锅、面饭、海鲜、饮品和快速预约入口。',
    privacy: '隐私政策',
    terms: '服务条款',
    cookies: 'Cookie 政策',
    contact: '联系',
    cancellation: '取消政策',
  },
};

export function Footer() {
  const { language } = useLanguage();
  const text = copy[language];

  return (
    <footer className="site-footer">
      <Logo />
      <p>{text.slogan}</p>
      <small>{text.small}</small>
      <nav className="footer-legal-links" aria-label="Legal links">
        <Link to="/privacy-policy">{text.privacy}</Link>
        <Link to="/terms-of-service">{text.terms}</Link>
        <Link to="/cookie-policy">{text.cookies}</Link>
        <Link to="/contact">{text.contact}</Link>
        <Link to="/cancellation-policy">{text.cancellation}</Link>
      </nav>
    </footer>
  );
}
