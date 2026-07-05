import { MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { site } from '../data/site';
import { useLanguage } from './languageContext';
import { Logo } from './Logo';

export function Header() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const labelFor = (item: (typeof site.nav)[number]) => {
    if (language === 'el') return item.labelEl;
    if (language === 'zh') return item.labelZh;
    return item.labelEn;
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.nav.map((item) => (
            <NavLink
              key={item.labelEn}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                `nav-link ${item.featured ? 'book-nav-button' : ''} ${isActive ? 'is-active' : ''}`
              }
            >
              <span>{labelFor(item)}</span>
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Language switcher">
            <button
              className={language === 'el' ? 'active' : ''}
              type="button"
              onClick={() => setLanguage('el')}
            >
              <span aria-hidden="true">🇬🇷</span>
              EL
            </button>
            <span />
            <button
              className={language === 'en' ? 'active' : ''}
              type="button"
              onClick={() => setLanguage('en')}
            >
              <span aria-hidden="true">🇬🇧</span>
              EN
            </button>
            <span />
            <button
              className={language === 'zh' ? 'active' : ''}
              type="button"
              onClick={() => setLanguage('zh')}
            >
              <span aria-hidden="true">🇨🇳</span>
              ZH
            </button>
          </div>
          <NavLink className="icon-button" to="/location" aria-label={language === 'el' ? 'Χάρτης' : language === 'zh' ? '地图' : 'Find us'}>
            <MapPin size={20} />
          </NavLink>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Open navigation"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-drawer" aria-label="Mobile navigation">
          {site.nav.map((item) => (
            <NavLink
              key={item.labelEn}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                `${item.featured ? 'mobile-book-link' : ''} ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              <span>{labelFor(item)}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
