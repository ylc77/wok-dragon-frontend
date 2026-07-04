import type { MenuCategory } from '../types/menu';
import { getCategoryLabel } from '../utils/menuText';
import { useLanguage } from './languageContext';

type MenuCategoryTabsProps = {
  categories: MenuCategory[];
  activeCategory: string;
  onChange: (categoryId: string) => void;
};

const categoryGroups = [
  {
    id: 'sets',
    labelEn: 'Set Menus',
    labelEl: '\u039c\u03b5\u03bd\u03bf\u03cd',
    categoryIds: ['menu-for-1', 'menu-for-2'],
  },
  {
    id: 'food',
    labelEn: 'Food',
    labelEl: '\u03a6\u03b1\u03b3\u03b7\u03c4\u03cc',
    categoryIds: [
      'soups',
      'salads',
      'appetizers',
      'soup-noodles',
      'fried-noodles',
      'fried-rice',
      'duck',
      'beef',
      'chicken',
      'pork',
      'seafood',
      'claypots',
      'dishes-with-rice',
      'vegetables',
      'kid-s-meals',
      'sweets',
    ],
  },
  {
    id: 'drinks',
    labelEn: 'Drinks',
    labelEl: '\u03a0\u03bf\u03c4\u03ac',
    categoryIds: ['soft-drinks', 'hot-tea', 'beers', 'wines', 'drinks'],
  },
];

export function MenuCategoryTabs({ categories, activeCategory, onChange }: MenuCategoryTabsProps) {
  const { language } = useLanguage();
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const orderedCategories = categoryGroups.flatMap((group) =>
    group.categoryIds
      .map((categoryId) => categoryById.get(categoryId))
      .filter((category): category is MenuCategory => Boolean(category)),
  );

  return (
    <div className="menu-tabs" role="tablist" aria-label="Menu categories">
      <label className="mobile-category-select">
        <span>{language === 'el' ? '\u0395\u03c0\u03b9\u03bb\u03bf\u03b3\u03ae \u03ba\u03b1\u03c4\u03b7\u03b3\u03bf\u03c1\u03af\u03b1\u03c2' : 'Choose category'}</span>
        <select value={activeCategory} onChange={(event) => onChange(event.target.value)}>
          {orderedCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {getCategoryLabel(category, language)}
            </option>
          ))}
        </select>
      </label>
      {categoryGroups.map((group) => {
        const groupCategories = group.categoryIds
          .map((categoryId) => categoryById.get(categoryId))
          .filter((category): category is MenuCategory => Boolean(category));

        return (
          <section key={group.id} className="menu-tab-group">
            <div className="menu-tab-group-label">{language === 'el' ? group.labelEl : group.labelEn}</div>
            <div className="menu-tab-buttons">
              {groupCategories.map((category) => {
                const label = getCategoryLabel(category, language);

                return (
                  <button
                    key={category.id}
                    className={category.id === activeCategory ? 'active' : ''}
                    type="button"
                    role="tab"
                    aria-selected={category.id === activeCategory}
                    onClick={() => onChange(category.id)}
                  >
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
