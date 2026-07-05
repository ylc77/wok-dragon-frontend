import { Link } from 'react-router-dom';
import { MapContactSection } from '../components/MapContactSection';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { ReservationSection } from '../components/ReservationSection';
import { useLanguage } from '../components/languageContext';

const copy = {
  el: {
    menu: 'Δείτε το μενού',
    title: 'Κράτηση τραπεζιού',
    body: 'Στείλτε μας το αίτημα κράτησης. Θα επικοινωνήσουμε μαζί σας για επιβεβαίωση.',
  },
  en: {
    menu: 'View menu',
    title: 'Book a Table',
    body: 'Send us your reservation request. We will contact you to confirm.',
  },
  zh: {
    menu: '查看菜单',
    title: '预约龙城酒楼',
    body: '提交预约请求后，餐厅会联系你确认。',
  },
};

export function ReservationPage() {
  const { language } = useLanguage();
  const text = copy[language];

  return (
    <>
      <section className="booking-hero">
        <div className="booking-hero-inner">
          <Link className="booking-breadcrumb" to="/menu">
            {text.menu}
          </Link>
          <h1>{text.title}</h1>
          <p>{text.body}</p>
        </div>
      </section>
      <ReservationSection />
      <MapContactSection mode="compact" />
      <MobileQuickNav />
    </>
  );
}
