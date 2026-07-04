import { foodImages } from './images';

export const site = {
  brandName: 'Wok Dragon',
  sloganEn: 'Bold Asian woks. Big flavors. Great times.',
  sloganEl:
    '\u0388\u03bd\u03c4\u03bf\u03bd\u03b5\u03c2 \u03b1\u03c3\u03b9\u03b1\u03c4\u03b9\u03ba\u03ad\u03c2 \u03b3\u03b5\u03cd\u03c3\u03b5\u03b9\u03c2. \u03a6\u03c1\u03ad\u03c3\u03ba\u03bf wok. \u03a9\u03c1\u03b1\u03af\u03b5\u03c2 \u03c3\u03c4\u03b9\u03b3\u03bc\u03ad\u03c2.',
  nav: [
    { labelEn: 'Home', labelEl: '\u0391\u03c1\u03c7\u03b9\u03ba\u03ae', href: '/' },
    { labelEn: 'Menu', labelEl: '\u039c\u03b5\u03bd\u03bf\u03cd', href: '/menu' },
    { labelEn: 'Book a Table', labelEl: '\u039a\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7', href: '/reservation', featured: true },
    { labelEn: 'Find Us', labelEl: '\u03a7\u03ac\u03c1\u03c4\u03b7\u03c2', href: '/location' },
    { labelEn: 'Contact', labelEl: '\u0395\u03c0\u03b9\u03ba\u03bf\u03b9\u03bd\u03c9\u03bd\u03af\u03b1', href: '/contact' },
  ],
  heroImages: [
    foodImages.pdfFriedNoodles,
    foodImages.pdfDuck,
    foodImages.pdfChickenSweetSour,
    foodImages.pdfNoodleSoup,
    foodImages.pdfSeafood,
  ],
};
