import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';

const MEMBERS = [
  {
    name: '佐藤 美咲',
    role: 'Consultant / 2024年新卒入社',
    quote: '1年目から「あなたはどう思う？」と問われ続ける環境です。',
    imgId: 'IMG-09',
    imgLabel: '若手社員ポートレート',
  },
  {
    name: '田中 蓮',
    role: 'Senior Consultant / 中途入社3年目',
    quote: '前職の倍のスピードで、倍の裁量。成長痛すら楽しい。',
    imgId: 'IMG-10',
    imgLabel: '中堅社員ポートレート',
  },
  {
    name: '山本 彩',
    role: 'Manager / 中途入社5年目',
    quote: '29歳でマネージャーに。年齢ではなく発明で評価される会社。',
    imgId: 'IMG-11',
    imgLabel: 'マネージャー社員ポートレート',
  },
];

export default function InterviewTeaser() {
  return (
    <section className="interview section section--tinted" id="interview">
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          <span className="section__eyebrow-num">05</span> INTERVIEW
        </p>
        <div className="section__head" data-reveal>
          <h2 className="section__title">
            ピースを発明する<span className="u-accent">人たち</span>。
          </h2>
          <Link to="/interview" className="btn-line">
            VIEW ALL INTERVIEWS <span className="btn-line__arrow">→</span>
          </Link>
        </div>
        <div className="interview__cards" data-reveal-group>
          {MEMBERS.map((m) => (
            <Link to="/interview" key={m.name} className="interview__card">
              <ImagePlaceholder id={m.imgId} label={m.imgLabel} ratio="3 / 4" />
              <p className="interview__quote">“{m.quote}”</p>
              <p className="interview__name">{m.name}</p>
              <p className="interview__role">{m.role}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
