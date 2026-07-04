const PHRASE = 'INVENTING THE MISSING PIECE — AISHIN Inc. — ';

/** セクション間を横断する無限ループのキネティックテキスト帯 */
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((i) => (
          <span key={i} className="marquee__text">
            {PHRASE.repeat(4)}
          </span>
        ))}
      </div>
    </div>
  );
}
