import { useLayoutEffect, useRef } from 'react';
import { PUZZLE_VARIANTS, type PuzzleVariant } from './puzzleShape';

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

/** 本体領域の縁と文字の間に確保する余白（px） */
const TEXT_MARGIN = 20;

/**
 * 物理演算で落下・ドラッグされる「言葉のピース」。
 * 会社テーマに合わせ、パズルのピース型のSVGを背景に敷く。
 * 形状は8種類のバリエーションからマウント時にランダムに選ばれ（P-016）、
 * 文字は凹凸（タブ/ノッチ）を差し引いた本体領域の中央に配置される（P-017）。
 * トップのHeroと下層のPageHeroで共通使用する。
 */
export default function WordPiece({ text, variant }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  // 再レンダリングで形が変わらないよう、初回に選んだ形状を保持する
  const choiceRef = useRef<PuzzleVariant | null>(null);
  if (choiceRef.current === null) {
    choiceRef.current = PUZZLE_VARIANTS[Math.floor(Math.random() * PUZZLE_VARIANTS.length)];
  }
  const { path, inset } = choiceRef.current;

  // 文字サイズ＋周囲の余白から、凹凸領域を含めたピース全体のサイズを算出する
  useLayoutEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;
    const { inset: ins } = choiceRef.current as PuzzleVariant;
    const bodyW = inner.offsetWidth + TEXT_MARGIN * 2;
    const bodyH = inner.offsetHeight + TEXT_MARGIN * 2;
    root.style.width = `${Math.ceil(bodyW / (1 - ins.left - ins.right))}px`;
    root.style.height = `${Math.ceil(bodyH / (1 - ins.top - ins.bottom))}px`;
  }, [text]);

  return (
    <div ref={rootRef} className={`hero__piece hero__piece--${variant}`}>
      <svg
        className="hero__piece-svg"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={path} vectorEffect="non-scaling-stroke" />
      </svg>
      {/* 凹凸を除いた本体領域に絶対配置し、その中で上下左右中央に置く */}
      <span
        className="hero__piece-text"
        style={{
          top: `${inset.top * 100}%`,
          right: `${inset.right * 100}%`,
          bottom: `${inset.bottom * 100}%`,
          left: `${inset.left * 100}%`,
        }}
      >
        <span ref={innerRef} className="hero__piece-text-inner">
          {text}
        </span>
      </span>
    </div>
  );
}
