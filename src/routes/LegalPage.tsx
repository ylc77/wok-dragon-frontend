import { Link } from 'react-router-dom';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { useCookieConsent } from '../components/useCookieConsent';
import { useLanguage } from '../components/languageContext';
import { legalConfig } from '../data/legal';
import type { LegalPageKey, LegalServiceProvider } from '../data/legal';

type LegalPageProps = {
  page: LegalPageKey;
};

type LegalSection = {
  title: string;
  body?: string;
  items?: string[];
};

type LegalCopy = {
  acceptAll: string;
  address: string;
  aiProviders: string;
  allergenTitle: string;
  analyticsCookiesBody: string;
  analyticsCookiesTitle: string;
  analyticsProviders: string;
  backToMenu: string;
  businessDetails: string;
  cancelChangeTitle: string;
  consentStorageBody: string;
  consentStorageTitle: string;
  cookieChoice: string;
  cookiePreferences: string;
  country: string;
  currentChoice: string;
  customerConfirmationBody: string;
  customerConfirmationTitle: string;
  dataControllerTitle: string;
  dataRetentionTitle: string;
  email: string;
  gemi: string;
  infoUseBody: string;
  infoUseTitle: string;
  lateArrivalBody: string;
  lateArrivalTitle: string;
  lastUpdated: string;
  legalName: string;
  mapEmbedsBody: string;
  mapEmbedsTitle: string;
  mapProviders: string;
  marketingCookiesBody: string;
  marketingCookiesTitle: string;
  menuPricesTitle: string;
  managePreferences: string;
  name: string;
  necessaryStorageBody: string;
  necessaryStorageTitle: string;
  noOnlinePayment: string;
  notAdviceBody: string;
  notAdviceTitle: string;
  onlinePayments: string;
  onlineRefundsTitle: string;
  paymentProviders: string;
  phone: string;
  privacyRequestInstructionsTitle: string;
  privacyRequests: string;
  receiptTitle: string;
  rejectNonEssential: string;
  reservationFormBody: string;
  reservationFormTitle: string;
  reservationNotificationProviders: string;
  reservationsTitle: string;
  restaurantContactTitle: string;
  retentionTitle: string;
  serviceProviders: string;
  temporaryChangesBody: string;
  temporaryChangesTitle: string;
  vat: string;
  websitePurposeBody: string;
  websitePurposeTitle: string;
  pageTitles: Record<LegalPageKey, string>;
};

const copy: Record<'el' | 'en' | 'zh', LegalCopy> = {
  el: {
    acceptAll: 'Αποδοχή όλων',
    address: 'Διεύθυνση',
    aiProviders: 'Πάροχοι AI',
    allergenTitle: 'Αλλεργιογόνα και διαθεσιμότητα',
    analyticsCookiesBody:
      'Τα cookies ανάλυσης χρησιμοποιούνται μόνο όταν είναι ενεργά στη ρύθμιση του ιστότοπου και επιτρέπονται από τον επισκέπτη.',
    analyticsCookiesTitle: 'Cookies ανάλυσης',
    analyticsProviders: 'Πάροχοι ανάλυσης',
    backToMenu: 'Πίσω στο μενού',
    businessDetails: 'Στοιχεία επιχείρησης',
    cancelChangeTitle: 'Ακύρωση ή αλλαγή κράτησης',
    consentStorageBody:
      'Η επιλεγμένη γλώσσα και η επιλογή cookies μπορεί να αποθηκεύονται τοπικά στο πρόγραμμα περιήγησης ώστε ο ιστότοπος να θυμάται την επιλογή.',
    consentStorageTitle: 'Προτιμήσεις γλώσσας και συναίνεσης',
    cookieChoice: 'Επιλογή cookies',
    cookiePreferences: 'Ρυθμίσεις cookies',
    country: 'Χώρα',
    currentChoice: 'Τρέχουσα επιλογή',
    customerConfirmationBody:
      'Οι πελάτες πρέπει να επιβεβαιώνουν τις τελικές λεπτομέρειες απευθείας με το εστιατόριο, ειδικά για μεγάλες παρέες, καθυστερήσεις ή ειδικά αιτήματα.',
    customerConfirmationTitle: 'Επιβεβαίωση από τον πελάτη',
    dataControllerTitle: 'Υπεύθυνος επεξεργασίας',
    dataRetentionTitle: 'Διατήρηση δεδομένων',
    email: 'Email',
    gemi: 'ΓΕΜΗ',
    infoUseBody:
      'Τα στοιχεία κράτησης χρησιμοποιούνται για απάντηση στο αίτημα, επικοινωνία με τον πελάτη, επιβεβαίωση διαθεσιμότητας και εύλογη συνέχεια της επικοινωνίας.',
    infoUseTitle: 'Πώς χρησιμοποιούνται τα στοιχεία',
    lateArrivalBody:
      'Αν οι πελάτες καθυστερήσουν, η διαθεσιμότητα τραπεζιού μπορεί να αλλάξει. Το εστιατόριο μπορεί να προσαρμόσει τις θέσεις ανάλογα με τη λειτουργία της ημέρας.',
    lateArrivalTitle: 'Καθυστέρηση και κράτηση τραπεζιού',
    lastUpdated: 'Τελευταία ενημέρωση',
    legalName: 'Νομική επωνυμία',
    mapEmbedsBody:
      'Το Google Maps ή παρόμοιο περιεχόμενο τρίτου παρόχου θεωρείται προαιρετικό και φορτώνεται μόνο μετά από συναίνεση ή άμεση ενέργεια του επισκέπτη.',
    mapEmbedsTitle: 'Χάρτες και ενσωματώσεις τρίτων',
    mapProviders: 'Πάροχοι χάρτη',
    marketingCookiesBody:
      'Τα cookies marketing χρησιμοποιούνται μόνο αν είναι ενεργά στη ρύθμιση του ιστότοπου και γίνουν αποδεκτά από τον επισκέπτη.',
    marketingCookiesTitle: 'Cookies marketing',
    menuPricesTitle: 'Μενού και τιμές',
    managePreferences: 'Διαχείριση προτιμήσεων',
    name: 'Όνομα',
    necessaryStorageBody:
      'Ο ιστότοπος μπορεί να χρησιμοποιεί απαραίτητη αποθήκευση στο πρόγραμμα περιήγησης για γλώσσα, επιλογές cookies και βασική λειτουργία.',
    necessaryStorageTitle: 'Απαραίτητα cookies και localStorage',
    noOnlinePayment: 'Ο ιστότοπος αυτή τη στιγμή δεν επεξεργάζεται online πληρωμές.',
    notAdviceBody:
      'Ο ιστότοπος δεν αποτελεί πλατφόρμα φορολογικών, νομικών, λογιστικών, ιατρικών, διατροφικών ή αλλεργιολογικών συμβουλών.',
    notAdviceTitle: 'Δεν αποτελεί επαγγελματική συμβουλή',
    onlinePayments: 'Online πληρωμές',
    onlineRefundsTitle: 'Online επιστροφές χρημάτων',
    paymentProviders: 'Πάροχοι πληρωμών',
    phone: 'Τηλέφωνο',
    privacyRequestInstructionsTitle: 'Αιτήματα διόρθωσης ή διαγραφής',
    privacyRequests: 'Αιτήματα απορρήτου',
    receiptTitle: 'Αποδείξεις και τιμολόγια',
    rejectNonEssential: 'Απόρριψη μη απαραίτητων',
    reservationFormBody:
      'Όταν ένας πελάτης στέλνει αίτημα κράτησης, ο ιστότοπος μπορεί να συλλέγει όνομα, τηλέφωνο, ημερομηνία, ώρα, αριθμό ατόμων και σημειώσεις.',
    reservationFormTitle: 'Στοιχεία φόρμας κράτησης',
    reservationNotificationProviders: 'Πάροχοι ειδοποιήσεων κράτησης',
    reservationsTitle: 'Κρατήσεις',
    restaurantContactTitle: 'Επικοινωνία εστιατορίου',
    retentionTitle: 'Διατήρηση',
    serviceProviders: 'Πάροχοι υπηρεσιών',
    temporaryChangesBody:
      'Οι ώρες λειτουργίας, η κουζίνα, η διαθεσιμότητα πιάτων ή οι θέσεις μπορεί να αλλάξουν λόγω αργιών, προσωπικού ή λειτουργικών αναγκών.',
    temporaryChangesTitle: 'Προσωρινές αλλαγές',
    vat: 'VAT / ΑΦΜ',
    websitePurposeBody:
      'Ο ιστότοπος παρέχει πληροφορίες εστιατορίου, μενού, τοποθεσία, στοιχεία επικοινωνίας και εργαλεία αιτήματος κράτησης.',
    websitePurposeTitle: 'Σκοπός ιστότοπου',
    pageTitles: {
      privacy: 'Πολιτική Απορρήτου',
      terms: 'Όροι Χρήσης',
      cookies: 'Πολιτική Cookies',
      cancellation: 'Πολιτική Ακυρώσεων',
    },
  },
  en: {
    acceptAll: 'Accept all',
    address: 'Address',
    aiProviders: 'AI providers',
    allergenTitle: 'Allergens and availability',
    analyticsCookiesBody: 'Analytics cookies are used only when enabled in the website configuration and allowed by the visitor.',
    analyticsCookiesTitle: 'Analytics cookies',
    analyticsProviders: 'Analytics providers',
    backToMenu: 'Back to menu',
    businessDetails: 'Business details',
    cancelChangeTitle: 'Cancel or change a reservation',
    consentStorageBody:
      'The selected language and cookie preference may be stored locally in the visitor browser so the website can remember the choice on later visits.',
    consentStorageTitle: 'Language and consent preferences',
    cookieChoice: 'Cookie choice',
    cookiePreferences: 'Cookie preferences',
    country: 'Country',
    currentChoice: 'Current choice',
    customerConfirmationBody:
      'Guests should confirm final reservation details directly with the restaurant, especially for group bookings, late arrivals, or special requests.',
    customerConfirmationTitle: 'Customer confirmation',
    dataControllerTitle: 'Data controller',
    dataRetentionTitle: 'Data retention',
    email: 'Email',
    gemi: 'GEMI',
    infoUseBody:
      'Reservation information is used to respond to the request, contact the guest, confirm availability, and manage reasonable follow-up questions.',
    infoUseTitle: 'How information is used',
    lateArrivalBody:
      'If guests arrive late, table availability may change. The restaurant may need to adjust seating based on daily operations and demand.',
    lateArrivalTitle: 'Late arrival and table holding',
    lastUpdated: 'Last updated',
    legalName: 'Legal name',
    mapEmbedsBody:
      'Google Maps or similar third-party content is treated as optional content and is loaded only after consent or a direct visitor action.',
    mapEmbedsTitle: 'Maps and third-party embeds',
    mapProviders: 'Map providers',
    marketingCookiesBody: 'Marketing cookies are used only if enabled in the website configuration and accepted by the visitor.',
    marketingCookiesTitle: 'Marketing cookies',
    menuPricesTitle: 'Menu and prices',
    managePreferences: 'Manage preferences',
    name: 'Name',
    necessaryStorageBody:
      'The website may use necessary browser storage for language preference, cookie consent preference, and basic website behavior. These are needed for a stable user experience.',
    necessaryStorageTitle: 'Necessary cookies and localStorage',
    noOnlinePayment: 'This website currently does not process online payments.',
    notAdviceBody:
      'This website is not a tax, legal, accounting, medical, allergy, or nutrition advice platform. Guests should contact the restaurant or a qualified professional where appropriate.',
    notAdviceTitle: 'Not professional advice',
    onlinePayments: 'Online payments',
    onlineRefundsTitle: 'Online refunds',
    paymentProviders: 'Payment providers',
    phone: 'Phone',
    privacyRequestInstructionsTitle: 'Correction or deletion requests',
    privacyRequests: 'Privacy requests',
    receiptTitle: 'Receipts and invoices',
    rejectNonEssential: 'Reject non-essential',
    reservationFormBody:
      'When a guest submits a reservation request, the website may collect name, phone number, selected date, selected time, guest count, and notes provided by the guest.',
    reservationFormTitle: 'Reservation form information',
    reservationNotificationProviders: 'Reservation notification providers',
    reservationsTitle: 'Reservations',
    restaurantContactTitle: 'Restaurant contact',
    retentionTitle: 'Retention',
    serviceProviders: 'Service providers',
    temporaryChangesBody:
      'Opening hours, kitchen availability, menu availability, or seating may change because of public holidays, staff availability, or operational needs.',
    temporaryChangesTitle: 'Temporary changes',
    vat: 'VAT / AFM',
    websitePurposeBody:
      'This website provides restaurant information, menu details, location details, contact information, and reservation request tools.',
    websitePurposeTitle: 'Website purpose',
    pageTitles: {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      cancellation: 'Cancellation Policy',
    },
  },
  zh: {
    acceptAll: '全部接受',
    address: '地址',
    aiProviders: 'AI 服务商',
    allergenTitle: '过敏原与供应情况',
    analyticsCookiesBody: '只有在配置中启用并获得访客同意时，本网站才会使用分析 Cookie。',
    analyticsCookiesTitle: '分析 Cookie',
    analyticsProviders: '分析服务商',
    backToMenu: '返回菜单',
    businessDetails: '商家信息',
    cancelChangeTitle: '取消或修改预约',
    consentStorageBody: '网站可能会在访客浏览器中保存语言和 Cookie 偏好，以便下次访问时记住选择。',
    consentStorageTitle: '语言与同意偏好',
    cookieChoice: 'Cookie 选择',
    cookiePreferences: 'Cookie 偏好设置',
    country: '国家',
    currentChoice: '当前选择',
    customerConfirmationBody: '顾客需要直接与餐厅确认最终预约，尤其是多人用餐、迟到或特殊要求。',
    customerConfirmationTitle: '顾客确认',
    dataControllerTitle: '数据控制者',
    dataRetentionTitle: '数据保留',
    email: '邮箱',
    gemi: 'GEMI',
    infoUseBody: '预约信息仅用于回复请求、联系顾客、确认座位供应以及处理合理的后续沟通。',
    infoUseTitle: '信息用途',
    lateArrivalBody: '如果顾客迟到，座位供应可能发生变化。餐厅可能根据当天运营情况调整座位。',
    lateArrivalTitle: '迟到与座位保留',
    lastUpdated: '最后更新',
    legalName: '法律主体名',
    mapEmbedsBody: 'Google Maps 或类似第三方内容属于可选内容，只会在用户同意或主动点击后加载。',
    mapEmbedsTitle: '地图与第三方嵌入内容',
    mapProviders: '地图服务商',
    marketingCookiesBody: '只有在配置中启用并获得访客同意时，本网站才会使用营销 Cookie。',
    marketingCookiesTitle: '营销 Cookie',
    menuPricesTitle: '菜单与价格',
    managePreferences: '管理偏好',
    name: '名称',
    necessaryStorageBody: '网站可能使用必要的浏览器存储来保存语言偏好、Cookie 偏好和基础网站功能。',
    necessaryStorageTitle: '必要 Cookie 与 localStorage',
    noOnlinePayment: '本网站当前不处理在线支付。',
    notAdviceBody: '本网站不是税务、法律、会计、医疗、过敏或营养建议平台。如有需要，请联系餐厅或专业人士。',
    notAdviceTitle: '非专业建议',
    onlinePayments: '在线支付',
    onlineRefundsTitle: '在线退款',
    paymentProviders: '支付服务商',
    phone: '电话',
    privacyRequestInstructionsTitle: '更正或删除请求',
    privacyRequests: '隐私请求',
    receiptTitle: '收据与发票',
    rejectNonEssential: '拒绝非必要',
    reservationFormBody: '当顾客提交预约请求时，网站可能收集姓名、电话、日期、时间、人数和备注。',
    reservationFormTitle: '预约表单信息',
    reservationNotificationProviders: '预约通知服务商',
    reservationsTitle: '预约',
    restaurantContactTitle: '餐厅联系方式',
    retentionTitle: '保留时间',
    serviceProviders: '第三方服务商',
    temporaryChangesBody: '营业时间、厨房供应、菜品供应或座位可能因节假日、人手或运营需要临时变动。',
    temporaryChangesTitle: '临时变动',
    vat: 'VAT / AFM',
    websitePurposeBody: '本网站用于展示餐厅信息、菜单、地址、联系方式和预约请求工具。',
    websitePurposeTitle: '网站用途',
    pageTitles: {
      privacy: '隐私政策',
      terms: '服务条款',
      cookies: 'Cookie 政策',
      cancellation: '取消政策',
    },
  },
};

function providerLines(providers: LegalServiceProvider[]) {
  return providers.map((provider) => `${provider.name}: ${provider.purpose}`);
}

function configuredBusinessDetails(text: LegalCopy) {
  return [
    `${legalConfig.businessName}`,
    `${text.legalName}: ${legalConfig.legalName}`,
    `${text.address}: ${legalConfig.businessAddress}`,
    `${text.vat}: ${legalConfig.vatNumber}`,
    `${text.gemi}: ${legalConfig.gemiNumber}`,
    `${text.email}: ${legalConfig.contactEmail}`,
    `${text.phone}: ${legalConfig.phone}`,
    `${text.country}: ${legalConfig.country}`,
  ];
}

function configuredProviderSections(text: LegalCopy): LegalSection[] {
  const sections: LegalSection[] = [
    {
      title: text.serviceProviders,
      items: providerLines(legalConfig.dataProcessors),
    },
  ];

  if (legalConfig.paymentProviders.length > 0) {
    sections.push({ title: text.paymentProviders, items: providerLines(legalConfig.paymentProviders) });
  } else {
    sections.push({ title: text.onlinePayments, body: text.noOnlinePayment });
  }

  if (legalConfig.analyticsProviders.length > 0) {
    sections.push({ title: text.analyticsProviders, items: providerLines(legalConfig.analyticsProviders) });
  }

  if (legalConfig.aiProviders.length > 0) {
    sections.push({ title: text.aiProviders, items: providerLines(legalConfig.aiProviders) });
  }

  if (legalConfig.usesMapEmbeds && legalConfig.mapProviders.length > 0) {
    sections.push({ title: text.mapProviders, items: providerLines(legalConfig.mapProviders) });
  }

  if (legalConfig.reservationNotificationProviders.length > 0) {
    sections.push({
      title: text.reservationNotificationProviders,
      items: providerLines(legalConfig.reservationNotificationProviders),
    });
  }

  return sections.filter((section) => section.body || (section.items?.length ?? 0) > 0);
}

function privacySections(text: LegalCopy): LegalSection[] {
  return [
    {
      title: text.dataControllerTitle,
      items: [
        `${text.name}: ${legalConfig.dataControllerName}`,
        `${text.address}: ${legalConfig.dataControllerAddress}`,
        `${text.privacyRequests}: ${legalConfig.privacyRequestEmail}`,
      ],
    },
    {
      title: text.businessDetails,
      items: configuredBusinessDetails(text),
    },
    {
      title: text.reservationFormTitle,
      body: text.reservationFormBody,
    },
    {
      title: text.infoUseTitle,
      body: text.infoUseBody,
    },
    ...configuredProviderSections(text),
    {
      title: text.privacyRequestInstructionsTitle,
      body: legalConfig.privacyRequestInstructions,
    },
    {
      title: text.dataRetentionTitle,
      body: legalConfig.dataRetention,
    },
  ];
}

function termsSections(text: LegalCopy): LegalSection[] {
  return [
    {
      title: text.websitePurposeTitle,
      body: text.websitePurposeBody,
    },
    {
      title: text.menuPricesTitle,
      body: legalConfig.menuAvailabilityDisclaimer,
    },
    {
      title: text.reservationsTitle,
      body: legalConfig.reservationTerms,
    },
    {
      title: text.customerConfirmationTitle,
      body: text.customerConfirmationBody,
    },
    {
      title: text.notAdviceTitle,
      body: text.notAdviceBody,
    },
    {
      title: text.allergenTitle,
      body: legalConfig.allergenDisclaimer,
    },
    {
      title: text.receiptTitle,
      body: legalConfig.taxReceiptDisclaimer,
    },
    ...configuredProviderSections(text),
  ];
}

function cookieSections(text: LegalCopy): LegalSection[] {
  const sections: LegalSection[] = [];

  if (legalConfig.usesNecessaryStorage) {
    sections.push({
      title: text.necessaryStorageTitle,
      body: text.necessaryStorageBody,
    });
  }

  sections.push({
    title: text.consentStorageTitle,
    body: text.consentStorageBody,
  });

  if (legalConfig.usesMapEmbeds && legalConfig.mapProviders.length > 0) {
    sections.push({
      title: text.mapEmbedsTitle,
      body: text.mapEmbedsBody,
      items: providerLines(legalConfig.mapProviders),
    });
  }

  if (legalConfig.usesAnalyticsCookies && legalConfig.analyticsProviders.length > 0) {
    sections.push({
      title: text.analyticsCookiesTitle,
      body: text.analyticsCookiesBody,
      items: providerLines(legalConfig.analyticsProviders),
    });
  }

  if (legalConfig.usesMarketingCookies) {
    sections.push({
      title: text.marketingCookiesTitle,
      body: text.marketingCookiesBody,
    });
  }

  sections.push({
    title: text.retentionTitle,
    body: legalConfig.cookieRetentionText,
  });

  return sections;
}

function cancellationSections(text: LegalCopy): LegalSection[] {
  return [
    {
      title: text.cancelChangeTitle,
      body: legalConfig.cancellationPolicy,
    },
    {
      title: text.onlineRefundsTitle,
      body: legalConfig.paymentProviders.length > 0 ? legalConfig.paymentTerms : text.noOnlinePayment,
    },
    {
      title: text.lateArrivalTitle,
      body: text.lateArrivalBody,
    },
    {
      title: text.temporaryChangesTitle,
      body: text.temporaryChangesBody,
    },
    {
      title: text.restaurantContactTitle,
      items: [
        `${text.phone}: ${legalConfig.phone}`,
        `${text.email}: ${legalConfig.contactEmail}`,
        `${text.address}: ${legalConfig.businessAddress}`,
      ],
    },
  ];
}

function getSections(page: LegalPageKey, text: LegalCopy) {
  if (page === 'privacy') return privacySections(text);
  if (page === 'terms') return termsSections(text);
  if (page === 'cookies') return cookieSections(text);
  return cancellationSections(text);
}

export function LegalPage({ page }: LegalPageProps) {
  const { language } = useLanguage();
  const { accept, reject, reset, status } = useCookieConsent();
  const legalLanguage = language === 'zh' ? 'zh' : language === 'el' ? 'el' : 'en';
  const text = copy[legalLanguage];
  const title = text.pageTitles[page];
  const sections = getSections(page, text);

  return (
    <>
      <section className="legal-page">
        <div className="legal-card">
          <span className="section-kicker">{legalConfig.businessName}</span>
          <h1>{title}</h1>
          <p className="legal-updated">
            {legalConfig.businessName} · {legalConfig.country} · {text.lastUpdated}: {legalConfig.lastUpdated}
          </p>
          <div className="legal-sections">
            {sections.map((section) => (
              <article key={section.title}>
                <h2>{section.title}</h2>
                {section.body && <p>{section.body}</p>}
                {section.items && section.items.length > 0 && (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          {page === 'cookies' && (
            <div className="legal-cookie-controls">
              <strong>{text.cookiePreferences}</strong>
              <span>
                {text.currentChoice}: {status ?? '-'}
              </span>
              <div className="privacy-actions">
                <button className="button button-red" type="button" onClick={accept}>
                  {text.acceptAll}
                </button>
                <button className="button button-dark" type="button" onClick={reject}>
                  {text.rejectNonEssential}
                </button>
                <button className="button button-outline" type="button" onClick={reset}>
                  {text.managePreferences}
                </button>
              </div>
            </div>
          )}

          <Link className="button button-outline legal-back-link" to="/menu">
            {text.backToMenu}
          </Link>
        </div>
      </section>
      <MobileQuickNav />
    </>
  );
}
