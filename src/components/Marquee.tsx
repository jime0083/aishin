type Props = {
  text?: string;
  /** 逆方向に流す */
  reverse?: boolean;
  /** 斜めに傾けたバリエーション */
  tilt?: boolean;
};

const DEFAULT_PHRASE = 'INVENTING THE MISSING PIECE — AISHIN Inc. — ';

/** セクション間を横断する無限ループのキネティックテキスト帯 */
export default function Marquee({ text = DEFAULT_PHRASE, reverse = false, tilt = false }: Props) {
  return (
    <div
      className={`marquee ${reverse ? 'marquee--reverse' : ''} ${tilt ? 'marquee--tilt' : ''}`}
      aria-hidden="true"
    >
      <div className="marquee__track">
        {[0, 1].map((i) => (
          <span key={i} className="marquee__text">
            {text.repeat(4)}
          </span>
        ))}
      </div>
    </div>
  );
}
