import { PUZZLE_PATH } from './puzzleShape';

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
 * 物理演算で落下・ドラッグされる「言葉のピース」。
 * 形状は全ピース共通のジグソーピース（PUZZLE_PATH）で、外枠は正方形比率・
 * 同一サイズにCSSで固定する（P-039）。凹凸を残しつつ「正方形に近いパズルピース」
 * に見せる。サイズはDOMの offsetWidth/Height を物理エンジンが読むため、CSSの
 * 正方形枠がそのまま剛体サイズになる。トップのHeroと下層のPageHeroで共通使用する。
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
        <path d={PUZZLE_PATH} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="hero__piece-text">{text}</span>
    </div>
  );
}
