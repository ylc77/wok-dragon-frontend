import { foodImages } from '../data/images';

const showcase = [
  { src: foodImages.drinks, label: 'Drinks / Ποτά' },
  { src: foodImages.heroNoodles, label: 'Noodles / Νουντλς' },
  { src: foodImages.riceBowl, label: 'Rice Bowls / Ρύζι' },
  { src: foodImages.springRolls, label: 'Starters / Ορεκτικά' },
];

export function FloatingFoodShowcase() {
  return (
    <section className="floating-showcase" aria-label="Food showcase">
      {showcase.map((item) => (
        <figure key={item.label}>
          <img src={item.src} alt={item.label} loading="lazy" />
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
    </section>
  );
}
