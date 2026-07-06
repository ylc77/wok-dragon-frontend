import type { Language } from '../components/languageContext';

export type StructuredSetMenuItem = {
  nameEl: string;
  nameEn: string;
  nameZh: string;
};

export type StructuredSetMenu = {
  id: string;
  group: 'menu-for-1' | 'menu-for-2';
  title: string;
  people?: string;
  price: string;
  items: StructuredSetMenuItem[];
};

export const structuredSetMenus: StructuredSetMenu[] = [
  {
    id: 'set-a',
    group: 'menu-for-1',
    title: 'A',
    price: '18.90',
    items: [
      { nameEl: 'Σούπα κοτόπουλο καλαμπόκι', nameEn: 'Chicken corn soup', nameZh: '鸡肉玉米汤' },
      { nameEl: 'Ανοιξιάτικα ρολά λαχανικών', nameEn: 'Spring rolls (vegetables)', nameZh: '蔬菜春卷' },
      { nameEl: 'Τηγανητό ρύζι με αυγό', nameEn: 'Egg fried rice', nameZh: '鸡蛋炒饭' },
      { nameEl: 'Γλυκόξινο κοτόπουλο', nameEn: 'Sweet & sour chicken', nameZh: '咕噜鸡' },
    ],
  },
  {
    id: 'set-b',
    group: 'menu-for-1',
    title: 'B',
    price: '18.90',
    items: [
      { nameEl: 'Σούπα καυτερή & ξινή', nameEn: 'Hot & sour soup', nameZh: '酸辣汤' },
      { nameEl: 'Ανοιξιάτικα ρολά λαχανικών', nameEn: 'Spring rolls (vegetables)', nameZh: '蔬菜春卷' },
      { nameEl: 'Τηγανητό ρύζι με αυγό', nameEn: 'Egg fried rice', nameZh: '鸡蛋炒饭' },
      { nameEl: 'Κοτόπουλο φιλεταρισμένο με σάλτσα Thai', nameEn: 'Sliced chicken with Thai sauce', nameZh: '泰汁鸡片' },
    ],
  },
  {
    id: 'set-c',
    group: 'menu-for-1',
    title: 'C',
    price: '19.90',
    items: [
      { nameEl: 'Σούπα κοτόπουλο καλαμπόκι', nameEn: 'Chicken corn soup', nameZh: '鸡肉玉米汤' },
      { nameEl: 'Ανοιξιάτικα ρολά λαχανικών', nameEn: 'Spring rolls (vegetables)', nameZh: '蔬菜春卷' },
      { nameEl: 'Τηγανητό ρύζι με αυγό', nameEn: 'Egg fried rice', nameZh: '鸡蛋炒饭' },
      { nameEl: 'Μοσχάρι με σάλτσα κάρυ', nameEn: 'Beef with curry sauce', nameZh: '咖喱牛肉' },
    ],
  },
  {
    id: 'set-d',
    group: 'menu-for-1',
    title: 'D',
    price: '20.90',
    items: [
      { nameEl: 'Σούπα κοτόπουλο καλαμπόκι', nameEn: 'Chicken corn soup', nameZh: '鸡肉玉米汤' },
      { nameEl: 'Ανοιξιάτικα ρολά λαχανικών', nameEn: 'Spring rolls (vegetables)', nameZh: '蔬菜春卷' },
      { nameEl: 'Τηγανητό ρύζι με αυγό', nameEn: 'Egg fried rice', nameZh: '鸡蛋炒饭' },
      { nameEl: 'Πάπια ψητή', nameEn: 'Roasted duck', nameZh: '烧鸭' },
    ],
  },
  {
    id: 'set-1',
    group: 'menu-for-2',
    title: '1',
    price: '36.90',
    items: [
      { nameEl: 'Σούπα καυτερή & ξινή x2', nameEn: 'Hot & sour soup x2', nameZh: '酸辣汤 x2' },
      { nameEl: 'Ανοιξιάτικα ρολά λαχανικών', nameEn: 'Spring rolls (vegetables)', nameZh: '蔬菜春卷' },
      { nameEl: 'Τηγανητά WonTon', nameEn: 'Fried WonTon', nameZh: '炸云吞' },
      { nameEl: 'Τηγανητό ρύζι με αυγό', nameEn: 'Egg fried rice', nameZh: '鸡蛋炒饭' },
      { nameEl: 'Γλυκόξινο κοτόπουλο', nameEn: 'Sweet & sour chicken', nameZh: '咕噜鸡' },
      { nameEl: 'Μοσχάρι με σάλτσα στρειδιών', nameEn: 'Beef with oyster sauce', nameZh: '蚝油牛肉' },
    ],
  },
  {
    id: 'set-2',
    group: 'menu-for-2',
    title: '2',
    price: '36.90',
    items: [
      { nameEl: 'Σούπα κοτόπουλο καλαμπόκι x2', nameEn: 'Chicken corn soup x2', nameZh: '鸡肉玉米汤 x2' },
      { nameEl: 'Ανοιξιάτικα ρολά λαχανικών', nameEn: 'Spring rolls (vegetables)', nameZh: '蔬菜春卷' },
      { nameEl: 'Τηγανητά WonTon', nameEn: 'Fried WonTon', nameZh: '炸云吞' },
      { nameEl: 'Τηγανητά noodles με αυγό', nameEn: 'Fried noodles with egg', nameZh: '鸡蛋炒面' },
      { nameEl: 'Κοτόπουλο με σάλτσα κάρυ', nameEn: 'Chicken with curry sauce', nameZh: '咖喱鸡' },
      { nameEl: 'Γλυκόξινο χοιρινό', nameEn: 'Sweet & sour pork', nameZh: '咕噜肉' },
    ],
  },
  {
    id: 'set-3',
    group: 'menu-for-2',
    title: '3',
    people: '4 person',
    price: '81.50',
    items: [
      { nameEl: 'Σούπα κοτόπουλο καλαμπόκι x4', nameEn: 'Chicken corn soup x4', nameZh: '鸡肉玉米汤 x4' },
      { nameEl: 'Ανοιξιάτικα ρολά λαχανικών', nameEn: 'Spring rolls (vegetables)', nameZh: '蔬菜春卷' },
      { nameEl: 'Τηγανητά WonTon', nameEn: 'Fried WonTon', nameZh: '炸云吞' },
      { nameEl: 'Τηγανητές φτερούγες κοτόπουλου', nameEn: 'Fried chicken wings', nameZh: '炸鸡翅' },
      { nameEl: 'Γαρίδες με σουσάμι', nameEn: 'Fried shrimps with sesame', nameZh: '芝麻炸虾' },
      { nameEl: 'Τηγανητά noodles με αυγό', nameEn: 'Fried noodles with egg', nameZh: '鸡蛋炒面' },
      { nameEl: 'Τηγανητό ρύζι με αυγό', nameEn: 'Egg fried rice', nameZh: '鸡蛋炒饭' },
      { nameEl: 'Γλυκόξινο κοτόπουλο', nameEn: 'Sweet & sour chicken', nameZh: '咕噜鸡' },
      { nameEl: 'Ανάμεικτα λαχανικά με σάλτσα στρειδιών', nameEn: 'Mixed vegetables with oyster sauce', nameZh: '蚝油杂菜' },
      { nameEl: 'Πάπια ψητή & χοιρινό Tja Siew', nameEn: 'Roasted duck & pork Tja Siew', nameZh: '烧鸭叉烧拼盘' },
    ],
  },
  {
    id: 'set-4',
    group: 'menu-for-2',
    title: '4',
    people: '4 person',
    price: '85.50',
    items: [
      { nameEl: 'Σούπα καυτερή & ξινή x4', nameEn: 'Hot & sour soup x4', nameZh: '酸辣汤 x4' },
      { nameEl: 'Ανοιξιάτικα ρολά λαχανικών', nameEn: 'Spring rolls (vegetables)', nameZh: '蔬菜春卷' },
      { nameEl: 'Τηγανητά WonTon', nameEn: 'Fried WonTon', nameZh: '炸云吞' },
      { nameEl: 'Τηγανητές φτερούγες κοτόπουλου', nameEn: 'Fried chicken wings', nameZh: '炸鸡翅' },
      { nameEl: 'Γαρίδες με σουσάμι', nameEn: 'Fried shrimps with sesame', nameZh: '芝麻炸虾' },
      { nameEl: 'Τηγανητά noodles με αυγό', nameEn: 'Fried noodles with egg', nameZh: '鸡蛋炒面' },
      { nameEl: 'Τηγανητό ρύζι με αυγό', nameEn: 'Egg fried rice', nameZh: '鸡蛋炒饭' },
      { nameEl: '1/2 πάπια ψητή', nameEn: '1/2 roasted duck', nameZh: '半只烧鸭' },
      { nameEl: 'Ανάμεικτα λαχανικά με γαρίδες', nameEn: 'Mixed vegetables with shrimps', nameZh: '虾仁杂菜' },
      { nameEl: 'Μοσχάρι με σάλτσα μαύρων φασολιών', nameEn: 'Beef with black bean sauce', nameZh: '豆豉牛肉' },
    ],
  },
];

export function getStructuredSetMenuItemName(item: StructuredSetMenuItem, language: Language) {
  if (language === 'el') return item.nameEl;
  if (language === 'zh') return item.nameZh;
  return item.nameEn;
}
