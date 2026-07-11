import type { Language } from '../components/languageContext';

export const siteUrl = 'https://www.wokdragon.gr';

type LocalizedText = Record<Language, string>;

export type SeoRoute = {
  title: LocalizedText;
  description: LocalizedText;
};

export const seoRoutes: Record<string, SeoRoute> = {
  '/': {
    title: {
      el: 'Wok Dragon Express | Κινέζικο εστιατόριο στην Αθήνα',
      en: 'Wok Dragon Express | Chinese Restaurant in Athens',
      zh: '龙城酒楼 | 雅典中餐厅',
    },
    description: {
      el: 'Ανακαλύψτε το Wok Dragon Express στην Αθήνα. Δείτε το μενού μας και στείλτε αίτημα κράτησης τραπεζιού online.',
      en: 'Discover Wok Dragon Express in Athens. Browse our Chinese menu and send a table reservation request online.',
      zh: '探索雅典龙城酒楼。浏览中餐菜单并在线发送订位请求。',
    },
  },
  '/menu': {
    title: {
      el: 'Μενού | Wok Dragon Express Αθήνα',
      en: 'Menu | Wok Dragon Express Athens',
      zh: '菜单 | 龙城酒楼 雅典',
    },
    description: {
      el: 'Δείτε το μενού του Wok Dragon Express στην Αθήνα, με κινέζικα πιάτα wok, noodles, ρύζι και πολλά άλλα.',
      en: 'Browse the Wok Dragon Express menu in Athens, with Chinese wok dishes, noodles, rice, and more.',
      zh: '查看雅典龙城酒楼菜单，包括中式炒菜、面食、米饭及更多菜品。',
    },
  },
  '/reservation': {
    title: {
      el: 'Κράτηση τραπεζιού | Wok Dragon Express',
      en: 'Book a Table | Wok Dragon Express',
      zh: '预约餐桌 | 龙城酒楼',
    },
    description: {
      el: 'Στείλτε αίτημα κράτησης στο Wok Dragon Express. Η τελική επιβεβαίωση γίνεται απευθείας από το εστιατόριο.',
      en: 'Send a reservation request to Wok Dragon Express. Final confirmation comes directly from the restaurant.',
      zh: '向龙城酒楼发送预约请求。最终预约由餐厅直接确认。',
    },
  },
  '/location': {
    title: {
      el: 'Τοποθεσία και ώρες | Wok Dragon Express Αθήνα',
      en: 'Location and Hours | Wok Dragon Express Athens',
      zh: '地址与营业时间 | 龙城酒楼 雅典',
    },
    description: {
      el: 'Βρείτε το Wok Dragon Express στη Μητροπόλεως 51, Αθήνα, και δείτε τις ώρες λειτουργίας και οδηγίες.',
      en: 'Find Wok Dragon Express at Mitropoleos 51, Athens, with opening hours and directions.',
      zh: '查找位于雅典 Mitropoleos 51 的龙城酒楼，查看营业时间与导航。',
    },
  },
  '/contact': {
    title: {
      el: 'Επικοινωνία | Wok Dragon Express Αθήνα',
      en: 'Contact | Wok Dragon Express Athens',
      zh: '联系我们 | 龙城酒楼 雅典',
    },
    description: {
      el: 'Επικοινωνήστε με το Wok Dragon Express στην Αθήνα για κρατήσεις, ώρες λειτουργίας και πληροφορίες.',
      en: 'Contact Wok Dragon Express in Athens for reservations, opening hours, and restaurant information.',
      zh: '联系雅典龙城酒楼，咨询预约、营业时间和餐厅信息。',
    },
  },
  '/privacy-policy': {
    title: { el: 'Πολιτική Απορρήτου | Wok Dragon Express', en: 'Privacy Policy | Wok Dragon Express', zh: '隐私政策 | 龙城酒楼' },
    description: { el: 'Πολιτική απορρήτου του Wok Dragon Express.', en: 'Wok Dragon Express privacy policy.', zh: '龙城酒楼隐私政策。' },
  },
  '/terms-of-service': {
    title: { el: 'Όροι Χρήσης | Wok Dragon Express', en: 'Terms of Service | Wok Dragon Express', zh: '服务条款 | 龙城酒楼' },
    description: { el: 'Όροι χρήσης του ιστότοπου Wok Dragon Express.', en: 'Terms of service for the Wok Dragon Express website.', zh: '龙城酒楼网站服务条款。' },
  },
  '/cookie-policy': {
    title: { el: 'Πολιτική Cookies | Wok Dragon Express', en: 'Cookie Policy | Wok Dragon Express', zh: 'Cookie 政策 | 龙城酒楼' },
    description: { el: 'Πολιτική cookies του Wok Dragon Express.', en: 'Wok Dragon Express cookie policy.', zh: '龙城酒楼 Cookie 政策。' },
  },
  '/cancellation-policy': {
    title: { el: 'Πολιτική Ακύρωσης | Wok Dragon Express', en: 'Cancellation Policy | Wok Dragon Express', zh: '取消政策 | 龙城酒楼' },
    description: { el: 'Πολιτική ακύρωσης κρατήσεων του Wok Dragon Express.', en: 'Reservation cancellation policy for Wok Dragon Express.', zh: '龙城酒楼预约取消政策。' },
  },
};

export function getSeoRoute(pathname: string) {
  if (pathname === '/book') return seoRoutes['/reservation'];
  if (pathname === '/privacy') return seoRoutes['/privacy-policy'];
  return seoRoutes[pathname] ?? seoRoutes['/'];
}
