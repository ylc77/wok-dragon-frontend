import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { foodImages } from '../data/images';
import { useLanguage } from './languageContext';

const showcase = [
  { src: foodImages.pdfAppetizers, labelEn: 'Starters', labelEl: 'Ορεκτικά', labelZh: '前菜' },
  { src: foodImages.pdfFriedNoodles, labelEn: 'Noodles', labelEl: 'Noodles', labelZh: '面类' },
  { src: foodImages.pdfFriedRice, labelEn: 'Rice Bowls', labelEl: 'Ρύζι', labelZh: '米饭' },
  { src: foodImages.pdfSoupDumpling, labelEn: 'Soups', labelEl: 'Σούπες', labelZh: '汤类' },
  { src: foodImages.pdfDuck, labelEn: 'Duck', labelEl: 'Πάπια', labelZh: '鸭类' },
  { src: foodImages.pdfChickenSweetSour, labelEn: 'Chicken', labelEl: 'Κοτόπουλο', labelZh: '鸡肉' },
  { src: foodImages.pdfSeafoodShrimp, labelEn: 'Seafood', labelEl: 'Θαλασσινά', labelZh: '海鲜' },
  { src: foodImages.pdfVegetables, labelEn: 'Vegetables', labelEl: 'Λαχανικά', labelZh: '蔬菜' },
  { src: foodImages.pdfBeefBroccoli, labelEn: 'Beef', labelEl: 'Μοσχάρι', labelZh: '牛肉' },
  { src: foodImages.pdfAppetizersDumplings, labelEn: 'Dumplings', labelEl: 'Dumplings', labelZh: '点心' },
];

export function FloatingFoodShowcase() {
  const { language } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const [loopDistance, setLoopDistance] = useState(0);
  const marqueeGroups = [showcase, showcase];

  useEffect(() => {
    const group = firstGroupRef.current;
    if (!group) return;

    const updateDistance = () => {
      setLoopDistance(Math.ceil(group.getBoundingClientRect().width));
    };

    updateDistance();
    const observer = new ResizeObserver(updateDistance);
    observer.observe(group);
    window.addEventListener('resize', updateDistance);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDistance);
    };
  }, [language]);

  return (
    <section className="floating-showcase" aria-label="Food showcase">
      <div
        className="showcase-track"
        ref={trackRef}
        style={{ '--showcase-loop-distance': `${loopDistance}px` } as CSSProperties}
      >
        {marqueeGroups.map((group, groupIndex) => (
          <div
            className="showcase-group"
            key={`showcase-group-${groupIndex}`}
            ref={groupIndex === 0 ? firstGroupRef : undefined}
            aria-hidden={groupIndex > 0}
          >
            {group.map((item, itemIndex) => {
              const label = language === 'el' ? item.labelEl : language === 'zh' ? item.labelZh : item.labelEn;
              const isPrimary = groupIndex === 0;

              return (
                <figure key={`${item.labelEn}-${groupIndex}-${itemIndex}`}>
                  <img src={item.src} alt={isPrimary ? label : ''} loading="eager" />
                  <figcaption>{label}</figcaption>
                </figure>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
