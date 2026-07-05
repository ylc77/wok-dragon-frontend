import { useMemo } from 'react';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { useLanguage } from '../components/languageContext';
import { getMenuPhotoLabel, getMenuPhotoSummary, menuPhotoPages } from '../data/menuPhotos';
import { getStructuredSetMenuItemName, structuredSetMenus } from '../data/setMenusStructured';

const copy = {
  el: {
    kicker: 'Wok Dragon Express',
    title: 'Μενού',
    intro:
      'Δείτε το ενημερωμένο μενού από τις φωτογραφίες του καταστήματος. Οι τιμές και τα πιάτα ισχύουν όπως εμφανίζονται στις εικόνες.',
    choose: 'Επιλέξτε κατηγορία',
    note: 'Οι φωτογραφίες εμφανίζονται με τη σειρά του φυσικού μενού.',
    page: 'Σελίδα',
    setMenuTitle: 'Set μενού',
    setMenuIntro: 'Πρώτη καθαρή έκδοση για τα set menus. Παρακαλούμε ελέγξτε τα στοιχεία με τις φωτογραφίες.',
    menuFor1: 'Μενού για 1',
    menuFor2: 'Μενού για 2',
    review: 'Σε έλεγχο',
  },
  en: {
    kicker: 'Wok Dragon Express',
    title: 'Menu',
    intro:
      'Browse the updated restaurant menu from the latest photographed pages. Dishes and prices are shown exactly as they appear in the images.',
    choose: 'Choose a category',
    note: 'Photos are shown in the same order as the printed menu.',
    page: 'Page',
    setMenuTitle: 'Set menus',
    setMenuIntro: 'First cleaned text version for set menus. Please verify against the photographed menu pages.',
    menuFor1: 'Menu for 1',
    menuFor2: 'Menu for 2',
    review: 'Under review',
  },
  zh: {
    kicker: 'Wok Dragon Express',
    title: '菜单',
    intro: '以下菜单已按最新拍摄图片顺序展示。菜品和价格以图片内容为准。',
    choose: '选择分类',
    note: '菜单照片按实体菜单顺序排列。',
    page: '第',
    setMenuTitle: '套餐菜单',
    setMenuIntro: '这是第一版文字化套餐菜单，内容已根据照片整理，正式使用前请再核对一次。',
    menuFor1: '单人套餐',
    menuFor2: '双人/多人套餐',
    review: '待核对',
  },
};

export function MenuPage() {
  const { language } = useLanguage();
  const text = copy[language];

  const primaryPages = useMemo(() => menuPhotoPages.slice(0, 6), []);
  const menuForOne = useMemo(() => structuredSetMenus.filter((menu) => menu.group === 'menu-for-1'), []);
  const menuForTwo = useMemo(() => structuredSetMenus.filter((menu) => menu.group === 'menu-for-2'), []);

  function scrollToPage(id: string) {
    document.getElementById(`menu-photo-${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  return (
    <>
      <section className="menu-photo-hero">
        <div className="menu-photo-hero-inner">
          <span className="section-kicker">{text.kicker}</span>
          <h1>{text.title}</h1>
          <p>{text.intro}</p>
        </div>
      </section>

      <section className="menu-photo-menu">
        <div className="menu-photo-shell">
          <aside className="menu-photo-picker" aria-label={text.choose}>
            <div className="menu-photo-picker-header">
              <strong>{text.choose}</strong>
              <span>{text.note}</span>
            </div>
            <div className="menu-photo-button-grid">
              {menuPhotoPages.map((page, index) => (
                <button key={page.id} type="button" onClick={() => scrollToPage(page.id)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {getMenuPhotoLabel(page, language)}
                </button>
              ))}
            </div>
          </aside>

          <div className="menu-photo-feature-grid" aria-label="Featured menu pages">
            {primaryPages.map((page, index) => (
              <button key={page.id} type="button" onClick={() => scrollToPage(page.id)}>
                <img src={page.src} alt={getMenuPhotoLabel(page, language)} loading={index === 0 ? 'eager' : 'lazy'} />
                <span>{getMenuPhotoLabel(page, language)}</span>
              </button>
            ))}
          </div>

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

          <div className="menu-photo-gallery">
            {menuPhotoPages.map((page, index) => (
              <article className="menu-photo-page" id={`menu-photo-${page.id}`} key={page.id}>
                <header>
                  <div>
                    <span className="menu-photo-page-number">
                      {language === 'zh' ? `${text.page}${index + 1}页` : `${text.page} ${index + 1}`}
                    </span>
                    <h2>{getMenuPhotoLabel(page, language)}</h2>
                    <p>{getMenuPhotoSummary(page, language)}</p>
                  </div>
                </header>
                <figure>
                  <img src={page.src} alt={getMenuPhotoLabel(page, language)} loading={index < 2 ? 'eager' : 'lazy'} />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>
      <MobileQuickNav />
    </>
  );
}
