import type { Language } from '../components/languageContext';

export type MenuPhotoPage = {
  id: string;
  src: string;
  labelEn: string;
  labelEl: string;
  labelZh: string;
  summaryEn: string;
  summaryEl: string;
  summaryZh: string;
};

export const menuPhotoPages: MenuPhotoPage[] = [
  {
    id: 'menu-for-1',
    src: '/menu-photos/page-01.jpg',
    labelEn: 'Menu for 1',
    labelEl: 'Μενού για 1',
    labelZh: '单人套餐',
    summaryEn: 'Set menu combinations for one person.',
    summaryEl: 'Συνδυαστικά μενού για ένα άτομο.',
    summaryZh: '适合一人的套餐组合。',
  },
  {
    id: 'menu-for-2',
    src: '/menu-photos/page-02.jpg',
    labelEn: 'Menu for 2',
    labelEl: 'Μενού για 2',
    labelZh: '双人/多人套餐',
    summaryEn: 'Set menus for two and four people.',
    summaryEl: 'Συνδυαστικά μενού για δύο και τέσσερα άτομα.',
    summaryZh: '适合两人和四人的套餐组合。',
  },
  {
    id: 'soups-salads',
    src: '/menu-photos/page-03.jpg',
    labelEn: 'Soups & Salads',
    labelEl: 'Σούπες & Σαλάτες',
    labelZh: '汤类 / 沙拉',
    summaryEn: 'Soups and salad dishes.',
    summaryEl: 'Σούπες και σαλάτες.',
    summaryZh: '汤类和沙拉菜品。',
  },
  {
    id: 'appetizers',
    src: '/menu-photos/page-04.jpg',
    labelEn: 'Appetizers',
    labelEl: 'Ορεκτικά',
    labelZh: '前菜',
    summaryEn: 'Spring rolls, dumplings, ribs, and fried starters.',
    summaryEl: 'Ορεκτικά, dumplings, ribs και τηγανητές επιλογές.',
    summaryZh: '春卷、饺子、排骨和炸类前菜。',
  },
  {
    id: 'noodle-soups',
    src: '/menu-photos/page-05.jpg',
    labelEn: 'Soup Noodles',
    labelEl: 'Σούπες με Noodles',
    labelZh: '汤面 / 汤粉',
    summaryEn: 'Noodle soups and rice noodle soups.',
    summaryEl: 'Σούπες με noodles και rice noodles.',
    summaryZh: '汤面和汤米粉类。',
  },
  {
    id: 'fried-noodles',
    src: '/menu-photos/page-06.jpg',
    labelEn: 'Fried Noodles',
    labelEl: 'Τηγανητά Noodles',
    labelZh: '炒面 / 炒米粉',
    summaryEn: 'Fried noodles and fried rice noodles.',
    summaryEl: 'Τηγανητά noodles και rice noodles.',
    summaryZh: '炒面和炒米粉类。',
  },
  {
    id: 'fried-rice',
    src: '/menu-photos/page-07.jpg',
    labelEn: 'Fried Rice',
    labelEl: 'Τηγανητό Ρύζι',
    labelZh: '炒饭',
    summaryEn: 'Fried rice dishes.',
    summaryEl: 'Πιάτα με τηγανητό ρύζι.',
    summaryZh: '各类炒饭。',
  },
  {
    id: 'duck',
    src: '/menu-photos/page-08.jpg',
    labelEn: 'Duck',
    labelEl: 'Πάπια',
    labelZh: '鸭类',
    summaryEn: 'Roasted duck and duck dishes.',
    summaryEl: 'Πάπια ψητή και πιάτα πάπιας.',
    summaryZh: '烧鸭及鸭肉菜品。',
  },
  {
    id: 'beef',
    src: '/menu-photos/page-09.jpg',
    labelEn: 'Beef',
    labelEl: 'Μοσχάρι',
    labelZh: '牛肉',
    summaryEn: 'Beef dishes with classic sauces.',
    summaryEl: 'Πιάτα μοσχαριού με κλασικές σάλτσες.',
    summaryZh: '各类牛肉菜品。',
  },
  {
    id: 'chicken',
    src: '/menu-photos/page-10.jpg',
    labelEn: 'Chicken',
    labelEl: 'Κοτόπουλο',
    labelZh: '鸡肉',
    summaryEn: 'Chicken dishes with sweet, spicy, and savory sauces.',
    summaryEl: 'Πιάτα κοτόπουλου με γλυκές, πικάντικες και αλμυρές σάλτσες.',
    summaryZh: '甜酸、咖喱、辣味等鸡肉菜品。',
  },
  {
    id: 'pork',
    src: '/menu-photos/page-11.jpg',
    labelEn: 'Pork',
    labelEl: 'Χοιρινό',
    labelZh: '猪肉',
    summaryEn: 'Pork dishes and ribs.',
    summaryEl: 'Πιάτα χοιρινού και ribs.',
    summaryZh: '猪肉和排骨类菜品。',
  },
  {
    id: 'seafood',
    src: '/menu-photos/page-12.jpg',
    labelEn: 'Seafood',
    labelEl: 'Θαλασσινά',
    labelZh: '海鲜',
    summaryEn: 'Shrimp, squid, fish, and seafood dishes.',
    summaryEl: 'Γαρίδες, καλαμάρι, ψάρι και θαλασσινά.',
    summaryZh: '虾、鱿鱼、鱼和海鲜类。',
  },
  {
    id: 'claypot-rice',
    src: '/menu-photos/page-13.jpg',
    labelEn: 'Claypot & Rice Dishes',
    labelEl: 'Claypot & Πιάτα με Ρύζι',
    labelZh: '砂锅 / 盖饭',
    summaryEn: 'Claypot dishes and rice plates.',
    summaryEl: 'Claypot και πιάτα με ρύζι.',
    summaryZh: '砂锅类和米饭套餐。',
  },
  {
    id: 'vegetables',
    src: '/menu-photos/page-14.jpg',
    labelEn: 'Vegetables',
    labelEl: 'Λαχανικά',
    labelZh: '蔬菜 / 豆腐',
    summaryEn: 'Vegetables, tofu, and egg dishes.',
    summaryEl: 'Λαχανικά, tofu και πιάτα με αυγά.',
    summaryZh: '蔬菜、豆腐和蛋类菜品。',
  },
  {
    id: 'kids-sweets',
    src: '/menu-photos/page-15.jpg',
    labelEn: "Kids' Meal & Sweets",
    labelEl: 'Παιδικά & Γλυκά',
    labelZh: '儿童餐 / 甜品',
    summaryEn: "Kids' options, desserts, and menu notes.",
    summaryEl: 'Παιδικές επιλογές, γλυκά και σημειώσεις μενού.',
    summaryZh: '儿童餐、甜品和菜单说明。',
  },
  {
    id: 'drinks',
    src: '/menu-photos/page-16.jpg',
    labelEn: 'Drinks',
    labelEl: 'Ποτά',
    labelZh: '饮品',
    summaryEn: 'Soft drinks, tea, beer, wine, and spirits.',
    summaryEl: 'Αναψυκτικά, τσάι, μπύρες, κρασιά και ποτά.',
    summaryZh: '软饮、茶、啤酒、葡萄酒和酒类。',
  },
];

export function getMenuPhotoLabel(page: MenuPhotoPage, language: Language) {
  if (language === 'el') return page.labelEl;
  if (language === 'zh') return page.labelZh;
  return page.labelEn;
}

export function getMenuPhotoSummary(page: MenuPhotoPage, language: Language) {
  if (language === 'el') return page.summaryEl;
  if (language === 'zh') return page.summaryZh;
  return page.summaryEn;
}
