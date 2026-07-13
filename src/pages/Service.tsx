import PageHero from '../components/PageHero';
import GiantWord from '../components/GiantWord';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Marquee from '../components/Marquee';
import EntryCta from '../sections/EntryCta';
import useSubpageAnimations from '../hooks/useSubpageAnimations';

type ServiceItem = {
  num: string;
  title: string;
  jp: string;
  giant: string;
  lead: string;
  challenges: string[];
  offers: { title: string; desc: string }[];
  steps: string[];
  imgId: string;
  imgLabel: string;
};

const SERVICES: ServiceItem[] = [
  {
    num: '01',
    title: 'Strategy Consulting',
    jp: '戦略コンサルティング',
    giant: 'STRATEGY',
    lead: '経営課題を構造化し、絵に描いた餅で終わらせない「実行できる戦略」を描きます。資料を納品して終わりではなく、現場に入り込み、成果が出るまで伴走するのがアイシンの流儀です。',
    challenges: [
      '売上や利益の伸び悩みの原因が特定できていない',
      '中期経営計画が現場の行動につながっていない',
      '新しい打ち手を検討するリソースやノウハウが社内にない',
    ],
    offers: [
      {
        title: '経営課題の構造化・診断',
        desc: 'データ分析と現場ヒアリングで課題の全体像を可視化し、取り組むべき順番を明確にします。',
      },
      {
        title: '成長戦略・事業戦略の策定',
        desc: '市場・競合・自社の分析に基づき、実行可能な戦略オプションを設計します。',
      },
      {
        title: '実行支援・PMO',
        desc: '戦略を現場のアクションに落とし込み、KPI管理と改善サイクルの定着まで支援します。',
      },
    ],
    steps: ['現状分析・課題の構造化', '戦略オプションの設計', '実行計画への落とし込み', '伴走・定着支援'],
    imgId: 'IMG-S01',
    imgLabel: '戦略ディスカッションの風景',
  },
  {
    num: '02',
    title: 'DX Acceleration',
    jp: 'DX支援',
    giant: 'DX',
    lead: 'ツールを導入して終わり、にはしません。データとテクノロジーで業務と事業そのものを再発明し、変革が現場の文化になるまで伴走します。',
    challenges: [
      '紙とExcel中心の業務から抜け出せない',
      'データが部署ごとに散在し、経営判断に活かせていない',
      'システムを導入したものの現場に定着しなかった',
    ],
    offers: [
      {
        title: 'DX戦略・ロードマップ策定',
        desc: '業務とデータの棚卸しから、投資対効果の高い変革の道筋を設計します。',
      },
      {
        title: 'データ基盤・ダッシュボード構築',
        desc: '散在するデータを統合し、意思決定に使える形で見える化します。',
      },
      {
        title: '業務プロセス再設計・定着化',
        desc: 'ツール任せにせず業務フローから再設計し、現場への定着と内製化まで支援します。',
      },
    ],
    steps: ['業務・データの棚卸し', 'DXロードマップ策定', 'ツール選定・導入・開発', '現場定着・内製化支援'],
    imgId: 'IMG-S02',
    imgLabel: 'データダッシュボードを囲むチーム',
  },
  {
    num: '03',
    title: 'New Business Design',
    jp: '新規事業開発',
    giant: 'CREATE',
    lead: '0→1の事業づくりをクライアントと共創します。アイデアの種を仮説検証で磨き上げ、「まだ見ぬピース」を勝てる事業に育て上げます。',
    challenges: [
      '新規事業のアイデアが社内からなかなか出てこない',
      'アイデアはあるが検証の進め方がわからない',
      '既存事業の枠を越えた成長の柱をつくりたい',
    ],
    offers: [
      {
        title: '事業機会の探索・アイデア創出',
        desc: '市場の兆しと自社の強みを掛け合わせるワークショップで、事業仮説を生み出します。',
      },
      {
        title: 'MVP設計・仮説検証の伴走',
        desc: '小さく速く検証を回し、撤退・継続の判断基準まで含めて伴走します。',
      },
      {
        title: 'グロース戦略・事業計画策定',
        desc: '検証を通過した事業の成長戦略と、投資判断に耐える事業計画を策定します。',
      },
    ],
    steps: ['機会探索・アイデア創出', '仮説検証・MVP開発', '事業化・ローンチ', 'グロース支援'],
    imgId: 'IMG-S03',
    imgLabel: '付箋を使ったワークショップ風景',
  },
];

export default function Service() {
  useSubpageAnimations({ skewTargets: '.svc__points, .svc__steps' });

  return (
    <>
      {/* 日本語サブ・導入文はユーザー指示（P-012）により表示しない */}
      <PageHero title="SERVICE" />

      <section className="section svc-intro">
        <div className="container">
          <h2 className="section__title">
            発明は、<span className="u-accent">3つの現場</span>で起こる。
          </h2>
          <div className="svc-intro__body" data-reveal>
            <p>
              アイシンのコンサルティングは、レポートの納品では終わりません。
              戦略・DX・新規事業という3つの現場で、クライアントのチームの一員として手を動かし、
              成果というピースがはまる瞬間まで伴走します。
            </p>
          </div>
        </div>
      </section>

      {SERVICES.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.num}
            className={`section svc ${flip ? 'section--tinted' : ''}`}
            id={`service-${s.num}`}
          >
            <GiantWord text={s.giant} side={flip ? 'left' : 'right'} />
            <div className="container">
              <p className="section__eyebrow" data-reveal>
                <span className="section__eyebrow-num">{s.num}</span> {s.title.toUpperCase()}
              </p>
              <div className={`svc__grid ${flip ? 'svc__grid--flip' : ''}`}>
                <div className="svc__media" data-reveal>
                  <span className="svc__num" aria-hidden="true">
                    {s.num}
                  </span>
                  <ImagePlaceholder
                    id={s.imgId}
                    label={s.imgLabel}
                    ratio="4 / 3"
                  />
                </div>
                <div className="svc__body">
                  <h2 className="section__title">{s.title}</h2>
                  <p className="svc__jp">{s.jp}</p>
                  <p className="svc__lead" data-reveal>
                    {s.lead}
                  </p>
                  <h3 className="svc__label" data-reveal>
                    こんな課題に
                  </h3>
                  <ul className="svc__challenges" data-reveal>
                    {s.challenges.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="svc__points" data-reveal-group>
                {s.offers.map((o, j) => (
                  <div key={o.title} className="svc__point">
                    <span className="svc__point-num">
                      {s.num}-{j + 1}
                    </span>
                    <h3>{o.title}</h3>
                    <p>{o.desc}</p>
                  </div>
                ))}
              </div>

              <div data-reveal>
                <h3 className="svc__label">進め方</h3>
                <ol className="svc__steps">
                  {s.steps.map((step, j) => (
                    <li key={step} className="svc__step">
                      <span className="svc__step-num">STEP {j + 1}</span>
                      <span className="svc__step-title">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        );
      })}

      <Marquee text="LET'S INVENT THE MISSING PIECE — " reverse tilt />
      <EntryCta />
    </>
  );
}
