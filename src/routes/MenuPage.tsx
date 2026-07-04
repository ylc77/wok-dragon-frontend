import { useMemo, useState } from 'react';
import { MenuCategoryTabs } from '../components/MenuCategoryTabs';
import { MenuList } from '../components/MenuList';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { useLanguage } from '../components/languageContext';
import { menuCategories, menuItems } from '../data/menu';
import { menuCategoryImageOverrides } from '../data/menuCategoryImages';
import { getCategoryLabel } from '../utils/menuText';

const featuredCategoryIds = new Set([
  'soups',
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
]);

const elText = {
  menu: '\u039c\u03b5\u03bd\u03bf\u03cd',
  title: 'Wok Dragon',
  intro:
    '\u0394\u03b5\u03af\u03c4\u03b5 set menus, noodles, \u03c1\u03cd\u03b6\u03b9, \u03ba\u03c1\u03b5\u03b1\u03c4\u03b9\u03ba\u03ac, seafood, \u03bb\u03b1\u03c7\u03b1\u03bd\u03b9\u03ba\u03ac \u03ba\u03b1\u03b9 \u03c0\u03bf\u03c4\u03ac.',
  category: '\u039a\u03b1\u03c4\u03b7\u03b3\u03bf\u03c1\u03af\u03b1',
  countSuffix:
    '\u03b5\u03c0\u03b9\u03bb\u03bf\u03b3\u03ad\u03c2 \u03c3\u03b5 \u03b1\u03c5\u03c4\u03ae \u03c4\u03b7\u03bd \u03ba\u03b1\u03c4\u03b7\u03b3\u03bf\u03c1\u03af\u03b1.',
  prices: '\u03a4\u03b9\u03bc\u03ad\u03c2 \u03c3\u03b5 \u20ac',
};

export function MenuPage() {
  const { language } = useLanguage();
  const isGreek = language === 'el';
  const sortedCategories = [...menuCategories].sort((a, b) => a.sortOrder - b.sortOrder);
  const [activeCategory, setActiveCategory] = useState(sortedCategories[0]?.id ?? '');
  const active = sortedCategories.find((category) => category.id === activeCategory) ?? sortedCategories[0];
  const activeLabel = active ? getCategoryLabel(active, language) : '';
  const imageOverride = active ? menuCategoryImageOverrides[active.id] : undefined;
  const galleryImages = (imageOverride?.galleryImages ?? active?.galleryImages ?? []).filter(Boolean);
  const shouldFeaturePhotos = Boolean(active && featuredCategoryIds.has(active.id) && galleryImages.length);

  const activeItems = useMemo(
    () =>
      menuItems
        .filter((item) => item.categoryId === active?.id)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [active?.id],
  );

  return (
    <>
      <section className="menu-hero menu-hero-polished">
        <div>
          <span className="section-kicker">{isGreek ? elText.menu : 'Menu'}</span>
          <h1>{isGreek ? elText.title : 'Wok Dragon'}</h1>
          <p>
            {isGreek
              ? elText.intro
              : 'Browse set menus, noodles, rice, meat, seafood, vegetables, and drinks.'}
          </p>
        </div>
      </section>

      <section className="menu-page menu-page-refined">
        <div className="menu-shell">
          <div className="menu-topbar">
            <MenuCategoryTabs categories={sortedCategories} activeCategory={active?.id} onChange={setActiveCategory} />
          </div>

          {active && (
            <header className={`menu-category-showcase ${shouldFeaturePhotos ? 'with-photos' : 'text-only'}`}>
              <div className="menu-category-copy">
                <span>{isGreek ? elText.category : 'Category'}</span>
                <h2>{activeLabel}</h2>
                <p>
                  {isGreek
                    ? `${activeItems.length} ${elText.countSuffix}`
                    : `${activeItems.length} dishes in this category.`}
                </p>
              </div>

              {shouldFeaturePhotos && (
                <div className={`menu-photo-mosaic photo-count-${Math.min(galleryImages.length, 5)}`} aria-label={activeLabel}>
                  {galleryImages.map((image, index) => (
                    <figure key={`${image}-${index}`}>
                      <img
                        src={image}
                        alt={`${activeLabel} ${index + 1}`}
                        onError={(event) => {
                          event.currentTarget.closest('figure')?.setAttribute('hidden', '');
                        }}
                      />
                    </figure>
                  ))}
                </div>
              )}
            </header>
          )}

          <div className="menu-board">
            <div className="menu-board-heading">
              <strong>{activeLabel}</strong>
              <span>{isGreek ? elText.prices : 'Prices in \u20ac'}</span>
            </div>
            <MenuList items={activeItems} />
          </div>
        </div>
      </section>
      <MobileQuickNav />
    </>
  );
}
