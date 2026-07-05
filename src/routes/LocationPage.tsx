import { MapContactSection } from '../components/MapContactSection';
import { MobileQuickNav } from '../components/MobileQuickNav';
import { useLanguage } from '../components/languageContext';
import { contactInfo } from '../data/contact';

const copy = {
  el: {
    kicker: 'Χάρτης',
    title: 'Βρείτε το Wok Dragon',
    body: `Επισκεφθείτε μας στη διεύθυνση ${contactInfo.address}.`,
  },
  en: {
    kicker: 'Find Us',
    title: 'Find Wok Dragon',
    body: `Visit us at ${contactInfo.address}.`,
  },
  zh: {
    kicker: '地图',
    title: '找到龙城酒楼',
    body: `欢迎到店用餐，地址：${contactInfo.address}。`,
  },
};

export function LocationPage() {
  const { language } = useLanguage();
  const text = copy[language];

  return (
    <>
      <section className="reservation-hero page-hero-location">
        <span className="section-kicker">{text.kicker}</span>
        <h1>{text.title}</h1>
        <p>{text.body}</p>
      </section>
      <MapContactSection mode="map" />
      <MobileQuickNav />
    </>
  );
}
