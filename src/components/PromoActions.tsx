import { Link } from 'react-router-dom';
import { useLanguage } from './languageContext';

const actions = [
  {
    titleEn: 'Our Menu',
    titleEl: 'Το μενού μας',
    titleZh: '龙城酒楼菜单',
    textEn: 'Explore wok dishes, noodles, rice bowls, starters, and drinks.',
    textEl: 'Δείτε πιάτα wok, noodles, ρύζι, ορεκτικά και ποτά.',
    textZh: '查看热炒、面饭、前菜和饮品。',
    href: '/menu',
  },
  {
    titleEn: 'Book a Table',
    titleEl: 'Κράτηση τραπεζιού',
    titleZh: '预约餐桌',
    textEn: 'Send a quick reservation request and the restaurant will confirm by phone.',
    textEl: 'Στείλτε γρήγορα αίτημα κράτησης και το εστιατόριο θα επιβεβαιώσει τηλεφωνικά.',
    textZh: '提交预约请求后，餐厅会电话确认。',
    href: '/reservation',
  },
  {
    titleEn: 'Find Us',
    titleEl: 'Βρείτε μας',
    titleZh: '找到龙城酒楼',
    textEn: 'Check the address, contact details, and map before you visit.',
    textEl: 'Δείτε διεύθυνση, στοιχεία επικοινωνίας και χάρτη πριν την επίσκεψη.',
    textZh: '到店前查看地址、电话和地图。',
    href: '/location',
  },
];

export function PromoActions() {
  const { language } = useLanguage();
  const continueLabel = language === 'el' ? 'Συνέχεια' : language === 'zh' ? '继续' : 'Continue';

  return (
    <section className="promo-actions" aria-label="Quick actions">
      {actions.map((action) => (
        <article key={action.titleEn} className="promo-card">
          <h3>{language === 'el' ? action.titleEl : language === 'zh' ? action.titleZh : action.titleEn}</h3>
          <p>{language === 'el' ? action.textEl : language === 'zh' ? action.textZh : action.textEn}</p>
          <Link className="button button-light" to={action.href}>
            {continueLabel}
          </Link>
        </article>
      ))}
    </section>
  );
}
