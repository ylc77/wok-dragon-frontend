import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <Logo />
      <p>Bold Asian woks. Big flavors. Great times.</p>
      <small>Fresh wok dishes, noodles, rice, seafood, drinks, and quick table requests in Athens.</small>
      <nav className="footer-legal-links" aria-label="Legal links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
        <Link to="/cookie-policy">Cookie Policy</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cancellation-policy">Cancellation Policy</Link>
      </nav>
    </footer>
  );
}
