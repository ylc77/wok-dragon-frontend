import { foodImages } from '../data/images';

const showcase = [
  { src: foodImages.drinks, label: 'Drinks / \u03a0\u03bf\u03c4\u03ac' },
  { src: foodImages.heroNoodles, label: 'Noodles / Noodles' },
  { src: foodImages.riceBowl, label: 'Rice Bowls / \u03a1\u03cd\u03b6\u03b9' },
  { src: foodImages.springRolls, label: 'Starters / \u039f\u03c1\u03b5\u03ba\u03c4\u03b9\u03ba\u03ac' },
];

export function FloatingFoodShowcase() {
  const marqueeItems = [...showcase, ...showcase];

  return (
    <section className="floating-showcase" aria-label="Food showcase">
      <div className="showcase-track">
        {marqueeItems.map((item, index) => (
          <figure key={`${item.label}-${index}`} aria-hidden={index >= showcase.length}>
            <img src={item.src} alt={index < showcase.length ? item.label : ''} loading="lazy" />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
