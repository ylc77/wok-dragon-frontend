import { foodImages } from '../data/images';

const showcase = [
  { src: foodImages.drinks, label: 'Drinks / \u03a0\u03bf\u03c4\u03ac' },
  { src: foodImages.heroNoodles, label: 'Noodles / Noodles' },
  { src: foodImages.riceBowl, label: 'Rice Bowls / \u03a1\u03cd\u03b6\u03b9' },
  { src: foodImages.springRolls, label: 'Starters / \u039f\u03c1\u03b5\u03ba\u03c4\u03b9\u03ba\u03ac' },
  { src: foodImages.pdfDuck, label: 'Duck / \u03a0\u03ac\u03c0\u03b9\u03b1' },
  { src: foodImages.pdfChickenSweetSour, label: 'Chicken / \u039a\u03bf\u03c4\u03cc\u03c0\u03bf\u03c5\u03bb\u03bf' },
  { src: foodImages.pdfSeafoodShrimp, label: 'Seafood / \u0398\u03b1\u03bb\u03b1\u03c3\u03c3\u03b9\u03bd\u03ac' },
  { src: foodImages.pdfVegetables, label: 'Vegetables / \u039b\u03b1\u03c7\u03b1\u03bd\u03b9\u03ba\u03ac' },
  { src: foodImages.pdfFriedRice, label: 'Fried Rice / \u03a1\u03cd\u03b6\u03b9' },
  { src: foodImages.pdfAppetizersDumplings, label: 'Dumplings / Dumplings' },
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
