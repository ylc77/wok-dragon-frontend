import type { Language } from '../components/languageContext';

export type StructuredMenuCategoryId = 'soups' | 'salads' | 'appetizers';

export type StructuredMenuCategory = {
  id: StructuredMenuCategoryId;
  labelEl: string;
  labelEn: string;
  labelZh: string;
};

export type StructuredMenuDish = {
  number: string;
  categoryId: StructuredMenuCategoryId;
  nameEl: string;
  nameEn: string;
  nameZh: string;
  price: string;
  spicy?: boolean;
  needsReview?: boolean;
};

export const structuredMenuCategories: StructuredMenuCategory[] = [
  { id: 'soups', labelEl: 'Σούπες', labelEn: 'Soups', labelZh: '汤类' },
  { id: 'salads', labelEl: 'Σαλάτες', labelEn: 'Salads', labelZh: '沙拉' },
  { id: 'appetizers', labelEl: 'Ορεκτικά', labelEn: 'Appetizers', labelZh: '前菜' },
];

export const structuredMenuDishes: StructuredMenuDish[] = [
  {
    number: '1',
    categoryId: 'soups',
    nameEl: 'Σούπα καυτερή και ξινή',
    nameEn: 'Hot and sour soup',
    nameZh: '酸辣汤',
    price: '4.90',
    spicy: true,
  },
  {
    number: '2',
    categoryId: 'soups',
    nameEl: 'Σούπα κοτόπουλο - καλαμπόκι',
    nameEn: 'Chicken corn soup',
    nameZh: '鸡蓉玉米汤',
    price: '4.90',
  },
  {
    number: '3',
    categoryId: 'soups',
    nameEl: 'Σούπα με WonTon (χοιρινό & γαρίδα)',
    nameEn: 'WonTon soup (pork & shrimp)',
    nameZh: '云吞汤（猪肉虾）',
    price: '5.90',
  },
  {
    number: '4',
    categoryId: 'soups',
    nameEl: 'Σούπα με dumplings γαρίδας',
    nameEn: 'Shrimp dumpling soup',
    nameZh: '虾饺汤',
    price: '6.90',
  },
  {
    number: '5',
    categoryId: 'soups',
    nameEl: 'Σούπα με θαλασσινά',
    nameEn: 'Seafood soup',
    nameZh: '海鲜汤',
    price: '5.90',
  },
  {
    number: '6',
    categoryId: 'soups',
    nameEl: 'Σούπα με φασόλια',
    nameEn: 'Tofu soup',
    nameZh: '豆腐汤',
    price: '4.50',
    needsReview: true,
  },
  {
    number: '7',
    categoryId: 'soups',
    nameEl: 'Σούπα με λαχανικά',
    nameEn: 'Vegetable soup',
    nameZh: '蔬菜汤',
    price: '4.50',
  },
  {
    number: '8',
    categoryId: 'soups',
    nameEl: 'Σούπα με ντομάτα & αυγό',
    nameEn: 'Egg and tomato soup',
    nameZh: '番茄蛋汤',
    price: '4.50',
  },
  {
    number: '27',
    categoryId: 'salads',
    nameEl: 'Κινέζικη σαλάτα',
    nameEn: 'Chinese salad',
    nameZh: '中式沙拉',
    price: '8.90',
  },
  {
    number: '28',
    categoryId: 'salads',
    nameEl: 'Γλυκόξινη σαλάτα',
    nameEn: 'Sweet & sour salad',
    nameZh: '甜酸沙拉',
    price: '8.90',
  },
  {
    number: '29',
    categoryId: 'salads',
    nameEl: 'Σπέσιαλ σαλάτα Wok Dragon',
    nameEn: 'Special Wok Dragon salad',
    nameZh: 'Wok Dragon 招牌沙拉',
    price: '9.90',
  },
  {
    number: '10',
    categoryId: 'appetizers',
    nameEl: 'Ανοιξιάτικα ρολά λαχανικών',
    nameEn: 'Spring rolls (vegetables)',
    nameZh: '蔬菜春卷',
    price: '3.90',
  },
  {
    number: '11',
    categoryId: 'appetizers',
    nameEl: 'Τηγανητά WonTon',
    nameEn: 'Fried WonTon',
    nameZh: '炸云吞',
    price: '3.90',
  },
  {
    number: '12',
    categoryId: 'appetizers',
    nameEl: 'Ρολά γαρίδας',
    nameEn: 'Shrimp rolls',
    nameZh: '虾卷',
    price: '4.90',
  },
  {
    number: '13',
    categoryId: 'appetizers',
    nameEl: 'Πιτάκια με πάπια',
    nameEn: 'Pancakes with duck',
    nameZh: '鸭肉薄饼',
    price: '7.90',
  },
  {
    number: '14',
    categoryId: 'appetizers',
    nameEl: 'Κράκερ γαρίδας',
    nameEn: 'Prawn crackers',
    nameZh: '虾片',
    price: '3.00',
  },
  {
    number: '15',
    categoryId: 'appetizers',
    nameEl: 'Τηγανητό τόστ γαρίδας',
    nameEn: 'Fried prawn toast',
    nameZh: '炸虾多士',
    price: '5.90',
  },
  {
    number: '16',
    categoryId: 'appetizers',
    nameEl: 'Τηγανητές φτερούγες κοτόπουλου',
    nameEn: 'Fried chicken wings',
    nameZh: '炸鸡翅',
    price: '4.30',
  },
  {
    number: '17',
    categoryId: 'appetizers',
    nameEl: 'Τηγανητές γαρίδες με σουσάμι',
    nameEn: 'Fried shrimps with sesame',
    nameZh: '芝麻炸虾',
    price: '7.30',
  },
  {
    number: '18',
    categoryId: 'appetizers',
    nameEl: 'Γλυκόξινα χοιρινά παϊδάκια',
    nameEn: 'Sweet and sour pork spare ribs',
    nameZh: '甜酸猪排骨',
    price: '7.30',
  },
  {
    number: '19',
    categoryId: 'appetizers',
    nameEl: 'Χοιρινά παϊδάκια με αλάτι & πιπέρι',
    nameEn: 'Pork spare ribs with salt & pepper',
    nameZh: '椒盐猪排骨',
    price: '7.30',
  },
  {
    number: '20',
    categoryId: 'appetizers',
    nameEl: 'Χοιρινά παϊδάκια με ζάχαρη & ξύδι',
    nameEn: 'Pork spare ribs with sugar & vinegar',
    nameZh: '糖醋猪排骨',
    price: '7.30',
  },
  {
    number: '21',
    categoryId: 'appetizers',
    nameEl: 'Τηγανητά dumplings με χοιρινό',
    nameEn: 'Fried dumplings with pork',
    nameZh: '猪肉煎饺',
    price: '9.90',
  },
  {
    number: '22',
    categoryId: 'appetizers',
    nameEl: 'Dumplings ατμού με γαρίδες',
    nameEn: 'Steamed shrimp dumplings',
    nameZh: '蒸虾饺',
    price: '6.90',
  },
  {
    number: '23',
    categoryId: 'appetizers',
    nameEl: 'Xia long bao ατμού με χοιρινό',
    nameEn: 'Steamed Xia long bao with pork',
    nameZh: '猪肉小笼包',
    price: '6.90',
  },
  {
    number: '24',
    categoryId: 'appetizers',
    nameEl: 'Κινέζικο ψωμάκι',
    nameEn: 'Steamed bread',
    nameZh: '中式馒头',
    price: '3.00',
  },
  {
    number: '25',
    categoryId: 'appetizers',
    nameEl: 'Γαρίδες τεμπούρα',
    nameEn: 'Shrimp tempura',
    nameZh: '天妇罗虾',
    price: '7.30',
  },
];

export function getStructuredMenuCategoryLabel(category: StructuredMenuCategory, language: Language) {
  if (language === 'el') return category.labelEl;
  if (language === 'zh') return category.labelZh;
  return category.labelEn;
}

export function getStructuredMenuDishName(dish: StructuredMenuDish, language: Language) {
  if (language === 'el') return dish.nameEl;
  if (language === 'zh') return dish.nameZh;
  return dish.nameEn;
}
