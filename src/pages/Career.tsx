import PageHero from '../components/PageHero';
import GiantWord from '../components/GiantWord';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Marquee from '../components/Marquee';
import EntryCta from '../sections/EntryCta';
import useSubpageAnimations from '../hooks/useSubpageAnimations';

/**
 * CAREERページ（/career）。
 * 内容のトレース元: recruit.positive.co.jp/graduates/ の Career セクション
 * （キャリアサポート4項目＋福利厚生・支援制度リスト。固有名詞はアイシン向けに置換）
 */

type CareerItem = {
  num: string;
  heading: string;
  paragraphs: string[];
};

const CAREER_ITEMS: CareerItem[] = [
  {
    num: '01',
    heading: '多彩なキャリアを、自ら描ける。',
    paragraphs: [
      'アイシンには決まったキャリアのレールがなく、自らの意思で道を切り拓くことができます。戦略・DX・新規事業という複数領域を展開しているため職種やポジションが豊富で、チームや役割の垣根を越えて多様な経験を積めるのが魅力です。',
      '与えられた道ではなく、自ら選び、自ら創るキャリアが実現できる。挑戦する人の可能性を信じ、成長を後押しするカルチャーが根づいています。',
    ],
  },
  {
    num: '02',
    heading: '任せる。だから20代で活躍できる。',
    paragraphs: [
      'メンバーを信じ、責任ある仕事を任せる文化があります。若手であっても主体的に挑戦できる環境が整っており、20代から組織の中核で活躍するメンバーが育っています。',
    ],
  },
  {
    num: '03',
    heading: 'ビジネスパーソンとしての成長も。AISHINカレッジシステム',
    paragraphs: [
      '役職や職種、年次に応じた研修制度に加え、AISHINビジネスカレッジや社外大学院への通学支援制度、独自のオンライン研修システムを用意。長期的な視点でメンバーのスキルアップをサポートしています。',
    ],
  },
  {
    num: '04',
    heading: 'スピード感をもった成長を支援。MBO制度',
    paragraphs: [
      '目標管理には「チャレンジシート」を導入し、3ヶ月ごとの目標設定と上司からのフィードバックを実施。短いサイクルで振り返ることで、スピード感のある成長を支援します。',
    ],
  },
];

const BENEFITS: { title: string; desc: string }[] = [
  {
    title: 'カフェテリアプラン制度',
    desc: '自己研鑽・健康・レジャーなどから自由に選べる選択型福利厚生。',
  },
  {
    title: '発明大賞',
    desc: '最も優れた「ピースの発明」を年に一度全社で表彰するアワード。',
  },
  {
    title: '内定者メンター制度',
    desc: '内定期間中から先輩社員がメンターとして伴走し、入社への不安を解消。',
  },
  {
    title: '休暇制度',
    desc: 'アニバーサリー休暇・リチャージ休暇など、休む力も支える制度。',
  },
  {
    title: 'ライフイベント支援',
    desc: '結婚・出産のお祝い金や式参列のためのサポートを用意。',
  },
  {
    title: 'サンクス手当',
    desc: '仲間への感謝をポイントで贈り合えるピアボーナス制度。',
  },
  {
    title: 'AISHINロングラン制度',
    desc: '勤続年数に応じた表彰とリフレッシュ休暇・旅行補助。',
  },
  {
    title: 'トレーナー制度',
    desc: '入社後1年間、先輩コンサルタントが1on1で日々の成長に伴走。',
  },
  {
    title: '働くパパママ支援制度',
    desc: '時短勤務・在宅勤務・復職支援など、子育てと挑戦の両立を支援。',
  },
  {
    title: '子どもの参観日休暇',
    desc: '子どもの学校行事に参加するための特別休暇。',
  },
];

export default function Career() {
  useSubpageAnimations({ skewTargets: '.crr__benefits' });

  return (
    <>
      <PageHero title="CAREER" />

      <section className="section svc-intro">
        <div className="container">
          <h2 className="section__title">
            成長に、<span className="u-accent">終わりはない</span>から。
          </h2>
          <div className="svc-intro__body" data-reveal>
            <p>
              AISHINのキャリアサポート。「若手に任せる」を口だけで終わらせないために、
              キャリアの選択肢と成長の仕組みに本気で投資しています。
            </p>
          </div>
        </div>
      </section>

      {/* 01・02（画像左） */}
      <section className="section crr">
        <GiantWord text="CAREER" side="right" />
        <div className="container">
          <div className="svc__grid">
            <div className="svc__media" data-reveal>
              <ImagePlaceholder
                id="IMG-C01"
                label="キャリア面談・1on1の風景"
                ratio="4 / 3"
                shape="puzzle"
              />
            </div>
            <div className="svc__body">
              {CAREER_ITEMS.slice(0, 2).map((item) => (
                <div key={item.num} className="crr__item" data-reveal>
                  <span className="crr__item-num">{item.num}</span>
                  <h3 className="crr__item-heading">{item.heading}</h3>
                  {item.paragraphs.map((p) => (
                    <p key={p.slice(0, 12)} className="crr__item-body">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03・04（画像右・左向きピースで右ライン揃え） */}
      <section className="section crr section--tinted">
        <GiantWord text="GROWTH" side="left" />
        <div className="container">
          <div className="svc__grid svc__grid--flip">
            <div className="svc__media" data-reveal>
              <ImagePlaceholder
                id="IMG-C02"
                label="研修・勉強会の風景"
                ratio="4 / 3"
                shape="puzzle-left"
              />
            </div>
            <div className="svc__body">
              {CAREER_ITEMS.slice(2).map((item) => (
                <div key={item.num} className="crr__item" data-reveal>
                  <span className="crr__item-num">{item.num}</span>
                  <h3 className="crr__item-heading">{item.heading}</h3>
                  {item.paragraphs.map((p) => (
                    <p key={p.slice(0, 12)} className="crr__item-body">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 福利厚生・支援制度リスト */}
      <section className="section crr-benefits">
        <GiantWord text="SUPPORT" side="right" />
        <div className="container">
          <p className="section__eyebrow" data-reveal>
            BENEFITS
          </p>
          <h2 className="section__title">
            挑戦を支える、<span className="u-accent">10の制度</span>。
          </h2>
          <div className="crr__benefits" data-reveal-group>
            {BENEFITS.map((b) => (
              <div key={b.title} className="crr__benefit">
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee text="GROW BEYOND YOUR LIMIT — " reverse tilt />
      <EntryCta />
    </>
  );
}
