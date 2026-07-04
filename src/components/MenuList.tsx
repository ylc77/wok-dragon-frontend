import type { MenuItem } from '../types/menu';
import { setMenuGreekCopy } from '../data/setMenuGreek';
import { cleanEnglish, cleanGreek, formatMenuPrice } from '../utils/menuText';
import { useLanguage } from './languageContext';

type MenuListProps = {
  items: MenuItem[];
};

export function MenuList({ items }: MenuListProps) {
  const { language } = useLanguage();
  const isSetMenu = items.some((item) => item.id.startsWith('menu-for-'));
  const reviewLabel =
    language === 'el'
      ? '\u03a7\u03c1\u03b5\u03b9\u03ac\u03b6\u03b5\u03c4\u03b1\u03b9 \u03ad\u03bb\u03b5\u03b3\u03c7\u03bf\u03c2'
      : 'Needs review';

  return (
    <div className={`menu-list ${isSetMenu ? 'set-menu-list' : ''}`}>
      {items.map((item) => {
        const setMenuGreek = language === 'el' ? setMenuGreekCopy[item.id] : undefined;
        const name =
          setMenuGreek?.nameEl ??
          (language === 'el'
            ? cleanGreek(item.nameEl) || cleanGreek(item.nameEn) || cleanEnglish(item.nameEn)
            : cleanEnglish(item.nameEn) || cleanEnglish(item.nameEl));
        const description =
          setMenuGreek?.descriptionEl ??
          (language === 'el'
            ? cleanGreek(item.descriptionEl) || cleanEnglish(item.descriptionEn)
            : cleanEnglish(item.descriptionEn));
        const descriptionParts = isSetMenu
          ? description
              .split(';')
              .map((part) => part.trim())
              .filter(Boolean)
          : [];

        return (
          <article key={`${item.id}-${item.sortOrder}`} className="menu-row">
            <span className="menu-row-number">{item.sortOrder}</span>
            <div className="menu-row-main">
              <div className="menu-row-heading">
                <h3>{name}</h3>
                {item.needsReview && <span>{reviewLabel}</span>}
              </div>
              {descriptionParts.length > 1 ? (
                <ul className="menu-set-details">
                  {descriptionParts.map((part) => (
                    <li key={part}>{part}</li>
                  ))}
                </ul>
              ) : (
                description && <p>{description}</p>
              )}
            </div>
            <b>{formatMenuPrice(item.price)}</b>
          </article>
        );
      })}
    </div>
  );
}
