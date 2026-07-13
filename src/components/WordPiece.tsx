type Props = {
  text: string;
  /** 配色バリエーション: solid | outline | yellow | white | piece */
  variant: string;
};

/**
 * FVで落下する「言葉のピース」の一覧（全ページ共通・P-020）。
 * トップのHeroと下層のPageHeroはこの定数を使い、内容を統一する。
 */
export const WORD_PIECES: { text: string; variant: string }[] = [
  { text: 'STRATEGY', variant: 'solid' },
  { text: 'DX', variant: 'yellow' },
  { text: 'PASSION', variant: 'outline' },
  { text: 'LOGIC', variant: 'white' },
  { text: 'CREATIVE', variant: 'solid' },
  { text: 'TEAM', variant: 'outline' },
  { text: 'GROWTH', variant: 'yellow' },
  { text: 'IDEA', variant: 'white' },
  { text: 'VISION', variant: 'outline' },
  { text: 'CHALLENGE', variant: 'solid' },
  { text: '?', variant: 'piece' },
];

/**
 * 角丸正方形パス（0..1正規化）。要素側を正方形サイズに固定するため、
 * viewBox="0 0 1 1" + preserveAspectRatio="none" でも角は円形に描画される（P-038）。
 */
const SQUARE_PATH =
  'M 0.08 0 H 0.92 A 0.08 0.08 0 0 1 1 0.08 ' +
  'V 0.92 A 0.08 0.08 0 0 1 0.92 1 ' +
  'H 0.08 A 0.08 0.08 0 0 1 0 0.92 ' +
  'V 0.08 A 0.08 0.08 0 0 1 0.08 0 Z';

/**
 * 物理演算で落下・ドラッグされる「言葉のピース」。
 * 形状は全ピース共通の角丸正方形で、サイズもCSSで一律に固定する（P-038）。
 * サイズはDOMの offsetWidth/Height を物理エンジンが読むため、CSSの正方形が
 * そのまま剛体サイズになる。トップのHeroと下層のPageHeroで共通使用する。
 */
export default function WordPiece({ text, variant }: Props) {
  return (
    <div className={`hero__piece hero__piece--${variant}`}>
      <svg
        className="hero__piece-svg"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={SQUARE_PATH} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="hero__piece-text">{text}</span>
    </div>
  );
}
