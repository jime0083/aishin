import PageHero from '../components/PageHero';
import GiantWord from '../components/GiantWord';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Marquee from '../components/Marquee';
import EntryCta from '../sections/EntryCta';
import useSubpageAnimations from '../hooks/useSubpageAnimations';

type WorkItem = {
  num: string;
  tag: string;
  /** 見出し（指定位置で改行するため行配列で持つ） */
  titleLines: string[];
  challenge: string;
  support: string;
  result: string;
  stat: {
    prefix?: string;
    value: number;
    decimals?: number;
    suffix: string;
    label: string;
  };
  imgId: string;
  imgLabel: string;
};

const WORKS: WorkItem[] = [
  {
    num: '01',
    tag: 'MANUFACTURING',
    titleLines: ['老舗製造業のDXで', '生産性132%を実現'],
    challenge:
      '紙の生産日報と熟練者の勘に頼った工程管理で、ボトルネックの特定に数週間かかっていた。',
    support:
      '現場に常駐して工程データをデジタル化。業務フローを再設計し、生産ダッシュボードの導入から定着までを伴走。',
    result: '生産性が前年比132%に向上。月間の残業時間も約2割削減された。',
    stat: { value: 132, suffix: '%', label: '生産性（前年比）' },
    imgId: 'IMG-W01',
    imgLabel: '製造業の工場・生産ラインの風景',
  },
  {
    num: '02',
    tag: 'RETAIL',
    titleLines: ['全国120店舗の', '小売チェーンの', '購買体験を再設計'],
    challenge: '店舗ごとに接客品質がばらつき、ECと店舗が分断されて機会損失が発生していた。',
    support:
      '顧客動線と購買データを分析し、店舗オペレーションを標準化。アプリと店舗をつなぐOMO体験を設計。',
    result: 'EC経由売上が2.6倍に。アプリ会員は1年で40万人増加した。',
    stat: { value: 2.6, decimals: 1, suffix: '倍', label: 'EC経由売上（施策後1年）' },
    imgId: 'IMG-W02',
    imgLabel: '小売店舗・売場の風景',
  },
  {
    num: '03',
    tag: 'STARTUP',
    titleLines: ['SAスタートアップ', '新規事業を', '0→1で共創'],
    challenge: '主力事業の成長が鈍化し、第二の柱となる新規事業の種がなかった。',
    support:
      '機会探索ワークショップで事業仮説を創出。MVPを設計し、高速の仮説検証サイクルを共に回した。',
    result: '検証開始から90日でローンチ。初年度で有料顧客100社を獲得した。',
    stat: { value: 90, suffix: '日', label: '構想からローンチまで' },
    imgId: 'IMG-W03',
    imgLabel: 'スタートアップのオフィス・開発風景',
  },
  {
    num: '04',
    tag: 'HEALTHCARE',
    titleLines: ['地域医療グループの', '経営改革で増収+24%'],
    challenge: '診療科ごとの採算が不透明で、慢性的な人材不足が経営を圧迫していた。',
    support:
      '部門別採算を可視化し、患者体験を再設計。採用ブランディングと定着施策までを一体で支援。',
    result: '増収+24%を達成。看護師の離職率も9ポイント改善した。',
    stat: { prefix: '+', value: 24, suffix: '%', label: '増収率（改革後2年）' },
    imgId: 'IMG-W04',
    imgLabel: '医療施設・スタッフの風景',
  },
  {
    num: '05',
    tag: 'LOGISTICS',
    titleLines: ['物流企業配送網最適化', 'コスト23%削減'],
    challenge: '燃料費の高騰とドライバー不足で、利益率が年々低下していた。',
    support:
      '配送データを分析して拠点とルートを再設計。需要予測モデルを導入し、積載率を最大化。',
    result: '配送コストを23%削減しながら、納期遵守率99%を維持した。',
    stat: { value: 23, suffix: '%', label: '配送コスト削減率' },
    imgId: 'IMG-W05',
    imgLabel: '物流倉庫・配送トラックの風景',
  },
];

export default function Works() {
  useSubpageAnimations({ skewTargets: '.wrk__rows' });

  return (
    <>
      <PageHero title="WORKS" />

      <section className="section svc-intro">
        <div className="container">
          <h2 className="section__title">
            成果で語る、<span className="u-accent">挑戦の記録</span>。
          </h2>
          <div className="svc-intro__body" data-reveal>
            <p>
              業界も規模も異なるクライアントとの、代表的なプロジェクトをご紹介します。
              どの現場にも「まだ見ぬピース」があり、私たちはそれを一緒に発明してきました。
            </p>
          </div>
        </div>
      </section>

      {WORKS.map((w, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={w.num} className={`section wrk ${flip ? 'section--tinted' : ''}`}>
            <GiantWord text={w.tag} side={flip ? 'left' : 'right'} />
            <div className="container">
              {/* svc__grid（左右交互のメディア＋テキストグリッド）を共通レイアウトとして流用 */}
              <div className={`svc__grid ${flip ? 'svc__grid--flip' : ''}`}>
                <div className="svc__media" data-reveal>
                  <span className="svc__num" aria-hidden="true">
                    {w.num}
                  </span>
                  <ImagePlaceholder
                    id={w.imgId}
                    label={w.imgLabel}
                    ratio="4 / 3"
                    shape={flip ? 'puzzle-left' : 'puzzle'}
                  />
                </div>
                <div className="svc__body">
                  <span className="works__tag">{w.tag}</span>
                  <h2 className="section__title wrk__title">
                    {w.titleLines.map((line, j) => (
                      <span key={line} className="wrk__title-line">
                        {line}
                        {j < w.titleLines.length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                  <dl className="wrk__rows">
                    <div className="wrk__row">
                      <dt>課題</dt>
                      <dd>{w.challenge}</dd>
                    </div>
                    <div className="wrk__row">
                      <dt>支援内容</dt>
                      <dd>{w.support}</dd>
                    </div>
                    <div className="wrk__row">
                      <dt>成果</dt>
                      <dd>{w.result}</dd>
                    </div>
                  </dl>
                  <p className="wrk__stat">
                    <span className="wrk__stat-value">
                      {w.stat.prefix}
                      <span data-count={w.stat.value} data-decimals={w.stat.decimals ?? 0}>
                        0
                      </span>
                      <span className="wrk__stat-suffix">{w.stat.suffix}</span>
                    </span>
                    <span className="wrk__stat-label">{w.stat.label}</span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <Marquee text="YOUR PIECE COMES NEXT — " reverse tilt />
      <EntryCta />
    </>
  );
}
