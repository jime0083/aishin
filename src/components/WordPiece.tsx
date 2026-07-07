import { PUZZLE_PATH } from './puzzleShape';

type Props = {
  text: string;
  /** 配色バリエーション: solid | outline | yellow | white | piece */
  variant: string;
};

/**
 * 物理演算で落下・ドラッグされる「言葉のピース」。
 * 会社テーマに合わせ、パズルのピース型のSVGを背景に敷く。
 * トップのHeroと下層のPageHeroで共通使用する。
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
