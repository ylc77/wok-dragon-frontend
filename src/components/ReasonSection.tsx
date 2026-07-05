import { Link } from 'react-router-dom';
import { useLanguage } from './languageContext';

const copy = {
  el: {
    kicker: 'Φρέσκο wok. Έντονη γεύση.',
    title: 'Πάντα υπάρχει λόγος για Wok',
    body: 'Δυνατή φωτιά, φρέσκα λαχανικά, πλούσιες σάλτσες και ασιατικές γεύσεις για γρήγορο lunch ή βραδινό με παρέα.',
    support: 'Fresh flavors, bold aromas, and Asian dishes for every moment.',
    book: 'Κράτηση τραπεζιού',
    find: 'Βρείτε μας',
  },
  en: {
    kicker: 'Fresh wok. Bold taste.',
    title: 'There is Always a Reason to Wok',
    body: 'Fast flames, bright vegetables, rich sauces, and Asian-inspired comfort made for quick lunches, casual dinners, and table-sharing nights.',
    support: 'Φρέσκες γεύσεις, έντονα αρώματα και ασιατικά πιάτα για κάθε στιγμή.',
    book: 'Book a Table',
    find: 'Find Us',
  },
  zh: {
    kicker: '现炒热锅，风味浓郁。',
    title: '总有一个来吃 Wok 的理由',
    body: '大火快炒、新鲜蔬菜、浓郁酱汁和亚洲风味，适合快速午餐、轻松晚餐和朋友聚餐。',
    support: 'Fresh flavors, bold aromas, and Asian dishes for every moment.',
    book: '预约餐桌',
    find: '查看位置',
  },
};

export function ReasonSection() {
  const { language } = useLanguage();
  const text = copy[language];

  return (
    <section className="reason-section">
      <div className="section-kicker">{text.kicker}</div>
      <h2>{text.title}</h2>
      <p>{text.body}</p>
      <p className="greek-line">{text.support}</p>
      <div className="reason-actions">
        <Link className="button button-red book-table-button" to="/reservation">
          {text.book}
        </Link>
        <a className="button button-outline" href="#location">
          {text.find}
        </a>
      </div>
    </section>
  );
}
