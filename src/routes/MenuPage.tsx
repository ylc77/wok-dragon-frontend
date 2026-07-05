import { useMemo, useState } from 'react';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { useLanguage } from '../components/languageContext';
import {
  getStructuredMenuCategoryLabel,
  getStructuredMenuDishName,
  structuredMenuCategories,
  structuredMenuDishes,
} from '../data/structuredMenuItems';
import type { StructuredMenuCategoryId } from '../data/structuredMenuItems';
import { getStructuredSetMenuItemName, structuredSetMenus } from '../data/setMenusStructured';

const copy = {
  el: {
    kicker: 'Wok Dragon Express',
    title: 'Μενού',
    intro:
      'Δείτε το καθαρό μενού του Wok Dragon με κατηγορίες, ονόματα πιάτων και τιμές. Οι τιμές βασίζονται στις τελευταίες φωτογραφίες του έντυπου μενού.',
    choose: 'Επιλέξτε κατηγορία',
    allCategories: 'Όλα',
    setMenuTitle: 'Set μενού',
    setMenuIntro: 'Πακέτα για 1, 2 ή 4 άτομα. Η τελική διαθεσιμότητα επιβεβαιώνεται από το εστιατόριο.',
    menuFor1: 'Μενού για 1',
    menuFor2: 'Μενού για 2',
    review: 'Έλεγχος',
    textMenuTitle: 'Κατάλογος πιάτων',
    textMenuIntro: 'Χρησιμοποιήστε τις κατηγορίες για γρήγορη αναζήτηση. Τα σημεία με ένδειξη ελέγχου χρειάζονται τελική επιβεβαίωση.',
    spicy: 'Καυτερό',
    needsReview: 'Έλεγχος',
    dishes: 'πιάτα',
  },
  en: {
    kicker: 'Wok Dragon Express',
    title: 'Menu',
    intro:
      'Browse the cleaned Wok Dragon menu by category, dish name, and price. Prices follow the latest photographed printed menu.',
    choose: 'Choose a category',
    allCategories: 'All',
    setMenuTitle: 'Set menus',
    setMenuIntro: 'Set options for 1, 2, or 4 people. Final availability is confirmed directly by the restaurant.',
    menuFor1: 'Menu for 1',
    menuFor2: 'Menu for 2',
    review: 'Under review',
    textMenuTitle: 'Dish list',
    textMenuIntro: 'Use the category buttons for quick browsing. Items marked for review still need final confirmation.',
    spicy: 'Spicy',
    needsReview: 'Review',
    dishes: 'dishes',
  },
  zh: {
    kicker: 'Wok Dragon Express',
    title: '菜单',
    intro: '按分类查看 Wok Dragon 菜单、菜名和价格。价格以最新拍摄的实体菜单照片为准。',
    choose: '选择分类',
    allCategories: '全部',
    setMenuTitle: '套餐菜单',
    setMenuIntro: '包含单人、双人和四人套餐。最终供应情况由餐厅确认。',
    menuFor1: '单人套餐',
    menuFor2: '双人 / 多人套餐',
    review: '待核对',
    textMenuTitle: '菜品列表',
    textMenuIntro: '可通过分类按钮快速查看。标记为待核对的菜品之后需要再确认。',
    spicy: '辣',
    needsReview: '待核对',
    dishes: '道菜',
  },
};

export function MenuPage() {
  const { language } = useLanguage();
  const text = copy[language];
  const [activeCategory, setActiveCategory] = useState<StructuredMenuCategoryId | 'all'>('all');

  const menuForOne = useMemo(() => structuredSetMenus.filter((menu) => menu.group === 'menu-for-1'), []);
  const menuForTwo = useMemo(() => structuredSetMenus.filter((menu) => menu.group === 'menu-for-2'), []);
  const visibleCategories = useMemo(
    () =>
      activeCategory === 'all'
        ? structuredMenuCategories
        : structuredMenuCategories.filter((category) => category.id === activeCategory),
    [activeCategory],
  );

  const dishCountByCategory = useMemo(() => {
    return structuredMenuDishes.reduce<Record<string, number>>((counts, dish) => {
      counts[dish.categoryId] = (counts[dish.categoryId] ?? 0) + 1;
      return counts;
    }, {});
  }, []);

  return (
    <>
      <section className="menu-photo-hero menu-text-hero">
        <div className="menu-photo-hero-inner">
          <span className="section-kicker">{text.kicker}</span>
          <h1>{text.title}</h1>
          <p>{text.intro}</p>
        </div>
      </section>

      <section className="menu-photo-menu">
        <div className="menu-photo-shell">
          <section className="menu-text-filter" aria-label={text.choose}>
            <div className="menu-photo-picker-header">
              <strong>{text.choose}</strong>
              <span>{text.textMenuIntro}</span>
            </div>
            <select
              className="menu-mobile-category-select"
              value={activeCategory}
              aria-label={text.choose}
              onChange={(event) => setActiveCategory(event.target.value as StructuredMenuCategoryId | 'all')}
            >
              <option value="all">{text.allCategories}</option>
              {structuredMenuCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {getStructuredMenuCategoryLabel(category, language)}
                </option>
              ))}
            </select>
            <div className="menu-text-filter-buttons">
              <button
                type="button"
                className={activeCategory === 'all' ? 'active' : ''}
                onClick={() => setActiveCategory('all')}
              >
                <span>{text.allCategories}</span>
              </button>
              {structuredMenuCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={activeCategory === category.id ? 'active' : ''}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{getStructuredMenuCategoryLabel(category, language)}</span>
                  <em>
                    {dishCountByCategory[category.id] ?? 0} {text.dishes}
                  </em>
                </button>
              ))}
            </div>
          </section>

          <section className="structured-set-menus" aria-labelledby="structured-set-menus-title">
            <header className="structured-set-menus-header">
              <div>
                <span className="section-kicker">{text.review}</span>
                <h2 id="structured-set-menus-title">{text.setMenuTitle}</h2>
                <p>{text.setMenuIntro}</p>
              </div>
            </header>

            <div className="structured-set-menu-group">
              <h3>{text.menuFor1}</h3>
              <div className="structured-set-menu-grid compact">
                {menuForOne.map((menu) => (
                  <article className="structured-set-menu-card" key={menu.id}>
                    <div className="structured-set-menu-card-head">
                      <strong>{menu.title}</strong>
                      <span>{menu.price} €</span>
                    </div>
                    <ol>
                      {menu.items.map((item) => (
                        <li key={`${menu.id}-${item.nameEn}`}>{getStructuredSetMenuItemName(item, language)}</li>
                      ))}
                    </ol>
                  </article>
                ))}
              </div>
            </div>

            <div className="structured-set-menu-group">
              <h3>{text.menuFor2}</h3>
              <div className="structured-set-menu-grid">
                {menuForTwo.map((menu) => (
                  <article className="structured-set-menu-card" key={menu.id}>
                    <div className="structured-set-menu-card-head">
                      <div>
                        <strong>{menu.title}</strong>
                        {menu.people && <em>{menu.people}</em>}
                      </div>
                      <span>{menu.price} €</span>
                    </div>
                    <ol>
                      {menu.items.map((item) => (
                        <li key={`${menu.id}-${item.nameEn}`}>{getStructuredSetMenuItemName(item, language)}</li>
                      ))}
                    </ol>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="structured-menu-items" aria-labelledby="structured-menu-items-title">
            <header className="structured-set-menus-header">
              <div>
                <span className="section-kicker">{text.review}</span>
                <h2 id="structured-menu-items-title">{text.textMenuTitle}</h2>
                <p>{text.textMenuIntro}</p>
              </div>
            </header>

            <div className="structured-menu-category-list">
              {visibleCategories.map((category) => {
                const dishes = structuredMenuDishes.filter((dish) => dish.categoryId === category.id);

                return (
                  <article className="structured-menu-category" key={category.id}>
                    <h3>{getStructuredMenuCategoryLabel(category, language)}</h3>
                    <div className="structured-menu-dishes">
                      {dishes.map((dish, index) => (
                        <div className="structured-menu-dish" key={`${category.id}-${dish.number}-${index}`}>
                          <span className="structured-menu-number">{dish.number}</span>
                          <div>
                            <strong>{getStructuredMenuDishName(dish, language)}</strong>
                            <div className="structured-menu-flags">
                              {dish.spicy && <span>{text.spicy}</span>}
                              {dish.needsReview && <span>{text.needsReview}</span>}
                            </div>
                          </div>
                          <b>{dish.price} €</b>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </section>
      <MobileQuickNav />
    </>
  );
}
