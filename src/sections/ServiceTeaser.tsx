import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import GiantWord from '../components/GiantWord';

const SERVICES = [
  {
    num: '01',
    title: 'Strategy Consulting',
    jp: '戦略コンサルティング',
    desc: '経営課題の構造化から実行支援まで。机上の資料で終わらせない、現場に効く戦略を。',
    imgId: 'IMG-03',
    imgLabel: '会議・戦略資料のイメージ',
  },
  {
    num: '02',
    title: 'DX Acceleration',
    jp: 'DX支援',
    desc: 'データとテクノロジーで業務と事業を再発明。ツール導入で終わらない変革を伴走します。',
    imgId: 'IMG-04',
    imgLabel: 'データダッシュボードのイメージ',
  },
  {
    num: '03',
    title: 'New Business Design',
    jp: '新規事業開発',
    desc: '0→1の事業づくりを共創。仮説検証からグロースまで、まだ見ぬピースを形にします。',
    imgId: 'IMG-05',
    imgLabel: 'ワークショップ風景のイメージ',
  },
];

export default function ServiceTeaser() {
  return (
    <section className="service section section--tinted" id="service">
      <GiantWord text="SERVICE" side="right" />
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          <span className="section__eyebrow-num">03</span> SERVICE
        </p>
        <div className="section__head" data-reveal>
          <h2 className="section__title">
            発明は、<span className="u-accent">3つの現場</span>で起こる。
          </h2>
          <Link to="/service" className="btn-line">
            VIEW ALL SERVICES <span className="btn-line__arrow">→</span>
          </Link>
        </div>
        <div className="service__cards" data-reveal-group>
          {SERVICES.map((s) => (
            <Link to="/service" key={s.num} className="service__card">
              <ImagePlaceholder id={s.imgId} label={s.imgLabel} ratio="3 / 2" />
              <div className="service__card-body">
                <span className="service__card-num">{s.num}</span>
                <h3 className="service__card-title">{s.title}</h3>
                <p className="service__card-jp">{s.jp}</p>
                <p className="service__card-desc">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
