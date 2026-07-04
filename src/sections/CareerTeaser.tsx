import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import GiantWord from '../components/GiantWord';

const SUPPORTS = [
  {
    title: 'メンター制度',
    desc: '新卒・中途を問わず、入社後1年間は先輩コンサルタントが1on1で伴走します。',
  },
  {
    title: 'アイシン・アカデミー',
    desc: 'ロジカルシンキングからデータ分析まで、月20時間以上の社内研修プログラム。',
  },
  {
    title: '発明評価制度',
    desc: '年次や年齢ではなく「どんなピースを発明したか」で評価・昇格が決まります。',
  },
];

export default function CareerTeaser() {
  return (
    <section className="career section" id="career">
      <GiantWord text="GROWTH" side="left" />
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          <span className="section__eyebrow-num">06</span> CAREER SUPPORT
        </p>
        <div className="career__grid">
          <div className="career__text" data-reveal>
            <h2 className="section__title">
              成長を、<span className="u-accent">仕組み</span>にする。
            </h2>
            <p className="career__lead">
              「若手に任せる」を口だけで終わらせないために、
              アイシンは成長を支える制度に本気で投資しています。
            </p>
            <ul className="career__list" data-reveal-group>
              {SUPPORTS.map((s) => (
                <li key={s.title} className="career__item">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ul>
            <Link to="/career" className="btn-line">
              VIEW CAREER SUPPORT <span className="btn-line__arrow">→</span>
            </Link>
          </div>
          <div className="career__image" data-reveal>
            <ImagePlaceholder id="IMG-12" label="研修・1on1の風景" ratio="4 / 5" />
          </div>
        </div>
      </div>
    </section>
  );
}
