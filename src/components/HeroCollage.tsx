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
          {isGreek ? 'Πάντα υπάρχει λόγος για Wok' : 'There is Always a Reason to Wok'}
        </h1>
        <p>{isGreek ? site.sloganEl : site.sloganEn}</p>
        <p className="greek-line">{isGreek ? site.sloganEn : site.sloganEl}</p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/menu">
            {isGreek ? 'Δείτε το μενού' : 'View Menu'}
          </Link>
          <Link className="button button-light book-table-button" to="/reservation">
            {isGreek ? 'Κράτηση τραπεζιού' : 'Book a Table'}
          </Link>
        </div>
      </div>
    </section>
  );
}
