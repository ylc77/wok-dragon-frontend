import { ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { site } from '../data/site';
import type { Language } from './languageContext';
import { useLanguage } from './languageContext';
import { Logo } from './Logo';

const languages: Array<{
  code: Language;
  short: string;
  name: string;
  flag: string;
}> = [
  { code: 'el', short: 'EL', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'en', short: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'zh', short: '中文', name: '中文', flag: '🇨🇳' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find((item) => item.code === language) ?? languages[0];

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
              className="language-current"
              type="button"
              aria-haspopup="menu"
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen((current) => !current)}
            >
              <span className="language-flag" aria-hidden="true">
                {currentLanguage.flag}
              </span>
              <strong>{currentLanguage.short}</strong>
              <ChevronDown size={15} aria-hidden="true" />
            </button>
            {languageOpen && (
              <div className="language-menu" role="menu">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={language === item.code}
                    className={language === item.code ? 'active' : ''}
                    onClick={() => {
                      setLanguage(item.code);
                      setLanguageOpen(false);
                    }}
                  >
                    <span className="language-flag" aria-hidden="true">
                      {item.flag}
                    </span>
                    <strong>{item.name}</strong>
                    <em>{item.short}</em>
                    {language === item.code && <b aria-hidden="true">✓</b>}
                  </button>
                ))}
              </div>
            )}
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
