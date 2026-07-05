import { foodImages } from './images';

export const site = {
  brandName: 'Wok Dragon',
  sloganEn: 'Bold Asian woks. Big flavors. Great times.',
  sloganEl:
    '\u0388\u03bd\u03c4\u03bf\u03bd\u03b5\u03c2 \u03b1\u03c3\u03b9\u03b1\u03c4\u03b9\u03ba\u03ad\u03c2 \u03b3\u03b5\u03cd\u03c3\u03b5\u03b9\u03c2. \u03a6\u03c1\u03ad\u03c3\u03ba\u03bf wok. \u03a9\u03c1\u03b1\u03af\u03b5\u03c2 \u03c3\u03c4\u03b9\u03b3\u03bc\u03ad\u03c2.',
  sloganZh: '龙城酒楼。热锅现炒。浓郁亚洲风味。',
  nav: [
    { labelEn: 'Home', labelEl: 'Αρχική', labelZh: '首页', href: '/' },
    { labelEn: 'Menu', labelEl: 'Μενού', labelZh: '菜单', href: '/menu' },
    { labelEn: 'Book a Table', labelEl: 'Κράτηση', labelZh: '预约', href: '/reservation', featured: true },
    { labelEn: 'Find Us', labelEl: 'Χάρτης', labelZh: '地图', href: '/location' },
    { labelEn: 'Contact', labelEl: 'Επικοινωνία', labelZh: '联系', href: '/contact' },
  ],
  heroImages: [
    foodImages.pdfFriedNoodles,
    foodImages.pdfDuck,
    foodImages.pdfChickenSweetSour,
    foodImages.pdfNoodleSoup,
    foodImages.pdfSeafood,
  ],
};
