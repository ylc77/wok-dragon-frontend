import { foodImages } from '../data/images';
import { useLanguage } from './languageContext';

const showcase = [
  { src: foodImages.drinks, labelEn: 'Drinks', labelEl: 'Ποτά', labelZh: '饮品' },
  { src: foodImages.heroNoodles, labelEn: 'Noodles', labelEl: 'Noodles', labelZh: '面类' },
  { src: foodImages.riceBowl, labelEn: 'Rice Bowls', labelEl: 'Ρύζι', labelZh: '米饭' },
  { src: foodImages.springRolls, labelEn: 'Starters', labelEl: 'Ορεκτικά', labelZh: '前菜' },
  { src: foodImages.pdfDuck, labelEn: 'Duck', labelEl: 'Πάπια', labelZh: '鸭类' },
  { src: foodImages.pdfChickenSweetSour, labelEn: 'Chicken', labelEl: 'Κοτόπουλο', labelZh: '鸡肉' },
  { src: foodImages.pdfSeafoodShrimp, labelEn: 'Seafood', labelEl: 'Θαλασσινά', labelZh: '海鲜' },
  { src: foodImages.pdfVegetables, labelEn: 'Vegetables', labelEl: 'Λαχανικά', labelZh: '蔬菜' },
  { src: foodImages.pdfFriedRice, labelEn: 'Fried Rice', labelEl: 'Ρύζι', labelZh: '炒饭' },
  { src: foodImages.pdfAppetizersDumplings, labelEn: 'Dumplings', labelEl: 'Dumplings', labelZh: '点心' },
];

export function FloatingFoodShowcase() {
  const { language } = useLanguage();
  const marqueeItems = [...showcase, ...showcase];

  return (
    <section className="floating-showcase" aria-label="Food showcase">
      <div className="showcase-track">
        {marqueeItems.map((item, index) => {
          const label = language === 'el' ? item.labelEl : language === 'zh' ? item.labelZh : item.labelEn;

          return (
            <figure key={`${item.labelEn}-${index}`} aria-hidden={index >= showcase.length}>
              <img src={item.src} alt={index < showcase.length ? label : ''} loading="lazy" />
              <figcaption>{label}</figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
