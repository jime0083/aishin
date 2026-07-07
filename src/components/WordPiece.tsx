import { useRef } from 'react';
import { PUZZLE_VARIANTS } from './puzzleShape';

type Props = {
  text: string;
  /** 配色バリエーション: solid | outline | yellow | white | piece */
  variant: string;
};

/**
 * 物理演算で落下・ドラッグされる「言葉のピース」。
 * 会社テーマに合わせ、パズルのピース型のSVGを背景に敷く。
 * 形状は8種類のバリエーションからマウント時にランダムに選ばれる（P-016）。
 * トップのHeroと下層のPageHeroで共通使用する。
 */
export default function WordPiece({ text, variant }: Props) {
  // 再レンダリングで形が変わらないよう、初回に選んだパスを保持する
  const pathRef = useRef<string | null>(null);
  if (pathRef.current === null) {
    pathRef.current = PUZZLE_VARIANTS[Math.floor(Math.random() * PUZZLE_VARIANTS.length)];
  }

  return (
    <div className={`hero__piece hero__piece--${variant}`}>
      <svg
        className="hero__piece-svg"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={pathRef.current} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="hero__piece-text">{text}</span>
    </div>
  );
}
