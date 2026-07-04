import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <Logo />
      <p>Bold Asian woks. Big flavors. Great times.</p>
      <small>Fresh wok dishes, noodles, rice, seafood, drinks, and quick table requests in Athens.</small>
      <Link className="footer-privacy-link" to="/privacy">
        Privacy & Cookies
      </Link>
    </footer>
  );
}
