const STATEMENT_LINES = ['世界は、まだ未完成。', 'ピースは、発明するもの。'];

export default function Mission() {
  return (
    <section className="mission section" id="mission">
      <div className="container">
        <p className="section__eyebrow" data-reveal>
          <span className="section__eyebrow-num">01</span> MISSION
        </p>
        <h2 className="mission__statement">
          {STATEMENT_LINES.map((line) => (
            <span key={line} className="mission__line" data-reveal-line>
              <span className="mission__line-inner">{line}</span>
            </span>
          ))}
        </h2>
        <div className="mission__body" data-reveal>
          <p>
            株式会社アイシンは、戦略コンサルティングを起点に、クライアントの事業に
            「まだ存在しない解決策＝まだ見ぬピース」を生み出すベンチャー企業です。
          </p>
          <p>
            既存のフレームワークをなぞるだけのコンサルティングはしない。
            現場に飛び込み、若いエネルギーとロジックで、
            誰も見たことのない一手を発明する。それが私たちの仕事です。
          </p>
        </div>
      </div>
    </section>
  );
}
