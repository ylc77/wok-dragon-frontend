import { foodImages } from './images';

export const site = {
  brandName: 'Wok Dragon',
  sloganEn: 'Bold Asian woks. Big flavors. Great times.',
  sloganEl: 'Έντονες ασιατικές γεύσεις. Φρέσκο wok. Ωραίες στιγμές.',
  nav: [
    { labelEn: 'Home', labelEl: 'Αρχική', href: '/' },
    { labelEn: 'Menu', labelEl: 'Μενού', href: '/menu' },
    { labelEn: 'Book a Table', labelEl: 'Κράτηση', href: '/reservation', featured: true },
    { labelEn: 'Find Us', labelEl: 'Χάρτης', href: '/location' },
    { labelEn: 'Contact', labelEl: 'Επικοινωνία', href: '/contact' },
  ],
  heroImages: [
    foodImages.pdfFriedNoodles,
    foodImages.pdfDuck,
    foodImages.pdfChickenSweetSour,
    foodImages.pdfNoodleSoup,
    foodImages.pdfSeafood,
  ],
};
