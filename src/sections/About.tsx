import ImagePlaceholder from '../components/ImagePlaceholder';

const STATS = [
  { value: 2018, label: '設立', suffix: '', decimals: 0 },
  { value: 48, label: 'メンバー数', suffix: '名', decimals: 0 },
  { value: 28.4, label: '平均年齢', suffix: '歳', decimals: 1 },
  { value: 120, label: '支援プロジェクト', suffix: '+', decimals: 0 },
];

const PROFILE: [string, string][] = [
  ['社名', '株式会社アイシン（Aishin Inc.）'],
  ['設立', '2018年4月'],
  ['代表取締役', '相心 太郎'],
  ['所在地', '東京都渋谷区（詳細住所は後日掲載）'],
  ['事業内容', '戦略コンサルティング／DX支援／新規事業開発支援'],
  ['メンバー数', '48名（平均年齢28.4歳）'],
];

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          <span className="section__eyebrow-num">02</span> ABOUT US
        </p>
        <div className="about__grid">
          <div className="about__text" data-reveal>
            <h2 className="section__title">
              若さは、<span className="u-accent">武器</span>だ。
            </h2>
            <p>
              アイシンのメンバーの平均年齢は28.4歳。新卒1年目からクライアントの経営課題に向き合い、
              裁量と責任を持ってプロジェクトを推進します。
              「若いから任せられない」ではなく「若いからこそ発明できる」。
              それが私たちの組織のつくり方です。
            </p>
            <div className="about__stats" data-reveal-group>
              {STATS.map((s) => (
                <div key={s.label} className="about__stat">
                  <span
                    className="about__stat-value"
                    data-count={s.value}
                    data-decimals={s.decimals}
                  >
                    0
                  </span>
                  <span className="about__stat-suffix">{s.suffix}</span>
                  <span className="about__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about__images" data-reveal>
            <ImagePlaceholder
              id="IMG-01"
              label="若手社員のディスカッション風景"
              ratio="4 / 3"
              className="about__img-main"
            />
            <ImagePlaceholder
              id="IMG-02"
              label="ホワイトボードで戦略を描く場面"
              ratio="4 / 5"
              className="about__img-sub"
            />
          </div>
        </div>

        <div className="about__profile" data-reveal>
          <h3 className="about__profile-title">COMPANY PROFILE</h3>
          <dl className="about__profile-table">
            {PROFILE.map(([key, val]) => (
              <div key={key} className="about__profile-row">
                <dt>{key}</dt>
                <dd>{val}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
