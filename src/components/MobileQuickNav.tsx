import { CalendarDays, MapPin, Menu as MenuIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from './languageContext';

export function MobileQuickNav() {
  const { language } = useLanguage();
  const isGreek = language === 'el';
  const isChinese = language === 'zh';

  const items = [
    {
      to: '/menu',
      label: isGreek ? '\u039c\u03b5\u03bd\u03bf\u03cd' : isChinese ? '菜单' : 'Menu',
      icon: MenuIcon,
      tone: 'light',
    },
    {
      to: '/reservation',
      label: isGreek ? '\u039a\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7' : isChinese ? '预约' : 'Book a Table',
      icon: CalendarDays,
      tone: 'red',
    },
    {
      to: '/location',
      label: isGreek ? '\u03a7\u03ac\u03c1\u03c4\u03b7\u03c2' : isChinese ? '地图' : 'Find Us',
      icon: MapPin,
      tone: 'dark',
    },
  ];

  return (
    <nav className="mobile-quick-nav" aria-label="Quick mobile navigation">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `quick-nav-${item.tone} ${isActive ? 'active' : ''}`}
          >
            <Icon size={19} />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
