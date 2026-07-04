import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { useLanguage } from './languageContext';

export function HeroCollage() {
  const { language } = useLanguage();
  const isGreek = language === 'el';

  return (
    <section className="hero-collage" aria-labelledby="hero-title">
      <div className="hero-image tile tile-one">
        <img src={site.heroImages[0]} alt="Crispy Asian starter plate" />
      </div>
      <div className="hero-image tile tile-two">
        <img src={site.heroImages[1]} alt="Wok noodles tossed with vegetables" />
      </div>
      <div className="hero-image tile tile-three">
        <img src={site.heroImages[2]} alt="Fresh rice bowl with vegetables" />
      </div>
      <div className="hero-image tile tile-four">
        <img src={site.heroImages[3]} alt="Asian wok dish close-up" />
      </div>
      <div className="hero-copy">
        <h1 id="hero-title">
          {isGreek
            ? '\u03a0\u03ac\u03bd\u03c4\u03b1 \u03c5\u03c0\u03ac\u03c1\u03c7\u03b5\u03b9 \u03bb\u03cc\u03b3\u03bf\u03c2 \u03b3\u03b9\u03b1 Wok'
            : 'There is Always a Reason to Wok'}
        </h1>
        <p>{isGreek ? site.sloganEl : site.sloganEn}</p>
        <p className="greek-line">{isGreek ? site.sloganEn : site.sloganEl}</p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/menu">
            {isGreek ? '\u0394\u03b5\u03af\u03c4\u03b5 \u03c4\u03bf \u03bc\u03b5\u03bd\u03bf\u03cd' : 'View Menu'}
          </Link>
          <Link className="button button-light book-table-button" to="/reservation">
            {isGreek ? '\u039a\u03c1\u03ac\u03c4\u03b7\u03c3\u03b7 \u03c4\u03c1\u03b1\u03c0\u03b5\u03b6\u03b9\u03bf\u03cd' : 'Book a Table'}
          </Link>
        </div>
      </div>
    </section>
  );
}
