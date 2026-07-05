import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { useLanguage } from './languageContext';

const heroCopy = {
  el: {
    titleLines: ['Πάντα υπάρχει', 'λόγος για Wok'],
    body: site.sloganEl,
    support: site.sloganEn,
    menu: 'Δείτε το μενού',
    book: 'Κράτηση τραπεζιού',
  },
  en: {
    titleLines: ['There is', 'Always a', 'Reason to Wok'],
    body: site.sloganEn,
    support: site.sloganEl,
    menu: 'View Menu',
    book: 'Book a Table',
  },
  zh: {
    titleLines: ['总有一个', '来吃 Wok 的理由'],
    body: site.sloganZh,
    support: 'Fresh wok. Bold taste.',
    menu: '查看菜单',
    book: '预约餐桌',
  },
};

export function HeroCollage() {
  const { language } = useLanguage();
  const text = heroCopy[language];
  const title = text.titleLines.join(' ');

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
        <h1 id="hero-title" key={language} className="hero-animated-title" aria-label={title}>
          {text.titleLines.map((line, index) => (
            <span key={line} className={`hero-title-line hero-title-line-${index + 1}`} aria-hidden="true">
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p>{text.body}</p>
        <p className="greek-line">{text.support}</p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/menu">
            {text.menu}
          </Link>
          <Link className="button button-light book-table-button" to="/reservation">
            {text.book}
          </Link>
        </div>
      </div>
    </section>
  );
}
