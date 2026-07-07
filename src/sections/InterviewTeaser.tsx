import { Link } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import GiantWord from '../components/GiantWord';

const MEMBERS = [
  {
    id: '01',
    name: '佐藤 美咲',
    role: 'Consultant / 2020年新卒入社',
    quote: '1年目から「あなたはどう思う？」と問われ続ける環境',
    imgId: 'IMG-09',
    imgLabel: '若手社員ポートレート',
  },
  {
    id: '02',
    name: '田中 蓮',
    role: 'Senior Consultant / 2019年中途入社',
    quote: '前職の倍のスピードで倍の裁量。成長痛すら楽しい',
    imgId: 'IMG-10',
    imgLabel: '中堅社員ポートレート',
  },
  {
    id: '03',
    name: '山本 彩',
    role: 'Manager / 2018年中途入社',
    quote: '29歳でマネージャーに。年齢ではなく挑戦で評価される会社',
    imgId: 'IMG-11',
    imgLabel: 'マネージャー社員ポートレート',
  },
];

export default function InterviewTeaser() {
  return (
    <section className="interview section section--tinted" id="interview">
      <GiantWord text="PEOPLE" side="right" />
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          <span className="section__eyebrow-num">04</span> INTERVIEW
        </p>
        <div className="section__head" data-reveal>
          <h2 className="section__title">
            ピースを発明する<span className="u-accent">人たち</span>。
          </h2>
        </div>
        {/* 一覧ページは持たず、各社員の詳細ページへ直接遷移する */}
        <div className="interview__cards" data-reveal-group>
          {MEMBERS.map((m) => (
            <Link to={`/interview/${m.id}`} key={m.name} className="interview__card">
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
