import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import GiantWord from '../components/GiantWord';

// 画像は WORKS ページ（IMG-W01〜W03）と連動させて同じ実績・同じ画像を使う
const WORKS = [
  {
    tag: 'MANUFACTURING',
    title: '老舗製造業のDXで生産性132%を実現',
    imgId: 'IMG-W01',
    imgLabel: '製造業の工場・生産ラインの風景',
  },
  {
    tag: 'RETAIL',
    title: '全国120店舗の小売チェーンの購買体験を再設計',
    imgId: 'IMG-W02',
    imgLabel: '小売店舗・売場の風景',
  },
  {
    tag: 'STARTUP',
    title: 'シリーズAスタートアップの新規事業を0→1で共創',
    imgId: 'IMG-W03',
    imgLabel: 'スタートアップのオフィス・開発風景',
  },
];

export default function WorksTeaser() {
  return (
    <section className="works section" id="works">
      <GiantWord text="WORKS" side="left" />
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          <span className="section__eyebrow-num">03</span> WORKS
        </p>
        <div className="section__head" data-reveal>
          <h2 className="section__title">
            成果で語る。<span className="u-accent">実績</span>の一部。
          </h2>
          <Link to="/works" className="btn-line">
            VIEW MORE WORKS <span className="btn-line__arrow">→</span>
          </Link>
        </div>
        <div className="works__cards" data-reveal-group>
          {WORKS.map((w) => (
            <Link to="/works" key={w.tag} className="works__card">
              <ImagePlaceholder id={w.imgId} label={w.imgLabel} ratio="4 / 3" />
              <span className="works__tag">{w.tag}</span>
              <h3 className="works__title">{w.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
