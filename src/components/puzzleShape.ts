/**
 * パズルピース形状のSVGパス（0〜1の正規化座標・時計回り）。
 * 上辺・右辺に凸タブ、下辺・左辺に凹ノッチを持つジグソーピース。
 * - WordPiece: viewBox="0 0 1 1" + preserveAspectRatio="none" で伸縮描画
 * - ImagePlaceholder: clipPathUnits="objectBoundingBox" のクリップに使用
 * 会社テーマ「まだ見ぬピースを発明する」に合わせ、サイト全体で共通使用する。
 */
export const PUZZLE_PATH =
  'M 0.05 0.16 H 0.35 ' +
  'A 0.08 0.107 0 1 0 0.5 0.16 ' + // 上辺の凸タブ
  'H 0.8 A 0.05 0.0667 0 0 1 0.85 0.2267 ' +
  'V 0.42 A 0.08 0.107 0 1 1 0.85 0.58 ' + // 右辺の凸タブ
  'V 0.9333 A 0.05 0.0667 0 0 1 0.8 1 ' +
  'H 0.55 A 0.08 0.107 0 1 1 0.4 1 ' + // 下辺の凹ノッチ
  'H 0.05 A 0.05 0.0667 0 0 1 0 0.9333 ' +
  'V 0.62 A 0.08 0.107 0 1 0 0 0.46 ' + // 左辺の凹ノッチ
  'V 0.2267 A 0.05 0.0667 0 0 1 0.05 0.16 Z';

/* ------------------------------------------------------------------
   4辺のタブ（凸）/ノッチ（凹）/フラットの組み合わせからパスを生成する
   ジェネレータ。落下ワードのピース形状バリエーション（P-016）に使用。
------------------------------------------------------------------- */

type Edge = 'tab' | 'notch' | 'flat';

type Edges = {
  top: Edge;
  right: Edge;
  bottom: Edge;
  left: Edge;
};

const CR_X = 0.05; // 角丸半径（x）
const CR_Y = 0.0667; // 角丸半径（y）
const KNOB_RX = 0.08; // タブ/ノッチ半径（x）
const KNOB_RY = 0.107; // タブ/ノッチ半径（y）
const HALF_X = 0.075; // 上下辺のネック半幅
const HALF_Y = 0.08; // 左右辺のネック半幅

const f = (n: number) => Number(n.toFixed(4));

/** 正規化座標（0..1）・時計回りのパズルピースパスを生成する */
export function buildPuzzlePath(edges: Edges): string {
  // タブがある辺だけ本体を内側に寄せ、張り出し分の余白を確保する
  const x0 = edges.left === 'tab' ? 0.15 : 0;
  const x1 = edges.right === 'tab' ? 0.85 : 1;
  const y0 = edges.top === 'tab' ? 0.16 : 0;
  const y1 = edges.bottom === 'tab' ? 0.84 : 1;
  const midX = (x0 + x1) / 2;
  const midY = (y0 + y1) / 2;
  const knob = (sweep: 0 | 1, x: number, y: number) =>
    `A ${KNOB_RX} ${KNOB_RY} 0 1 ${sweep} ${f(x)} ${f(y)}`;
  const corner = (x: number, y: number) => `A ${CR_X} ${CR_Y} 0 0 1 ${f(x)} ${f(y)}`;

  const d: string[] = [`M ${f(x0 + CR_X)} ${f(y0)}`];
  // 上辺（進行方向 +x。タブ=上凸 sweep0 / ノッチ=下凹 sweep1）
  if (edges.top !== 'flat') {
    d.push(`H ${f(midX - HALF_X)}`, knob(edges.top === 'tab' ? 0 : 1, midX + HALF_X, y0));
  }
  d.push(`H ${f(x1 - CR_X)}`, corner(x1, y0 + CR_Y));
  // 右辺（進行方向 +y。タブ=右凸 sweep1 / ノッチ=左凹 sweep0）
  if (edges.right !== 'flat') {
    d.push(`V ${f(midY - HALF_Y)}`, knob(edges.right === 'tab' ? 1 : 0, x1, midY + HALF_Y));
  }
  d.push(`V ${f(y1 - CR_Y)}`, corner(x1 - CR_X, y1));
  // 下辺（進行方向 -x。タブ=下凸 sweep0 / ノッチ=上凹 sweep1）
  if (edges.bottom !== 'flat') {
    d.push(`H ${f(midX + HALF_X)}`, knob(edges.bottom === 'tab' ? 0 : 1, midX - HALF_X, y1));
  }
  d.push(`H ${f(x0 + CR_X)}`, corner(x0, y1 - CR_Y));
  // 左辺（進行方向 -y。タブ=左凸 sweep1 / ノッチ=右凹 sweep0）
  if (edges.left !== 'flat') {
    d.push(`V ${f(midY + HALF_Y)}`, knob(edges.left === 'tab' ? 1 : 0, x0, midY - HALF_Y));
  }
  d.push(`V ${f(y0 + CR_Y)}`, corner(x0 + CR_X, y0), 'Z');
  return d.join(' ');
}

const VARIANT_EDGES: Edges[] = [
  { top: 'tab', right: 'tab', bottom: 'notch', left: 'notch' },
  { top: 'notch', right: 'tab', bottom: 'tab', left: 'flat' },
  { top: 'tab', right: 'notch', bottom: 'flat', left: 'tab' },
  { top: 'flat', right: 'tab', bottom: 'notch', left: 'tab' },
  { top: 'tab', right: 'flat', bottom: 'tab', left: 'notch' },
  { top: 'notch', right: 'notch', bottom: 'tab', left: 'tab' },
  { top: 'tab', right: 'tab', bottom: 'flat', left: 'notch' },
  { top: 'flat', right: 'notch', bottom: 'tab', left: 'tab' },
];

/** 落下ワード用の形状バリエーション（マウント時にランダム選択） */
export const PUZZLE_VARIANTS: string[] = VARIANT_EDGES.map((edges) => buildPuzzlePath(edges));

/**
 * PUZZLE_PATH の左右反転版（凸タブが左辺に来る形状）。
 * 本体の右端がフラット（x=1）になるため、右カラム配置の画像を
 * コンテナの右ラインに揃えたい場合に使用する（例: SERVICE 02）。
 */
export const PUZZLE_PATH_LEFT =
  'M 0.95 0.16 H 0.65 ' +
  'A 0.08 0.107 0 1 1 0.5 0.16 ' + // 上辺の凸タブ
  'H 0.2 A 0.05 0.0667 0 0 0 0.15 0.2267 ' +
  'V 0.42 A 0.08 0.107 0 1 0 0.15 0.58 ' + // 左辺の凸タブ
  'V 0.9333 A 0.05 0.0667 0 0 0 0.2 1 ' +
  'H 0.45 A 0.08 0.107 0 1 0 0.6 1 ' + // 下辺の凹ノッチ
  'H 0.95 A 0.05 0.0667 0 0 0 1 0.9333 ' +
  'V 0.62 A 0.08 0.107 0 1 1 1 0.46 ' + // 右辺の凹ノッチ
  'V 0.2267 A 0.05 0.0667 0 0 0 0.95 0.16 Z';
