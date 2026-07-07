import { PUZZLE_PATH, PUZZLE_PATH_LEFT } from './puzzleShape';

type Props = {
  id: string;
  label: string;
  /** aspect-ratio (e.g. "4 / 3") */
  ratio?: string;
  /** 切り抜き形状（未指定なら従来の角丸矩形）。puzzle-left は凸タブが左・右端フラット */
  shape?: 'puzzle' | 'puzzle-left' | 'ellipse' | 'blob1' | 'blob2' | 'arch' | 'pill';
  className?: string;
};

/**
 * 画像差し込み予定地のフレーム。
 * img.txt の一覧と同じ ID を表示し、後から実画像に置き換える。
 */
export default function ImagePlaceholder({ id, label, ratio = '4 / 3', shape, className }: Props) {
  const inner = (
    <>
      <svg className="img-ph__cross" aria-hidden="true">
        <line x1="0" y1="0" x2="100%" y2="100%" />
        <line x1="100%" y1="0" x2="0" y2="100%" />
      </svg>
      <span className="img-ph__id">{id}</span>
      <span className="img-ph__label">{label}</span>
    </>
  );

  // パズルピース型: 外側ラッパーでSVGクリップし、
  // 内側の .img-ph はスクロール連動マスクリビール（clip-path inset）の対象のまま残す
  if (shape === 'puzzle' || shape === 'puzzle-left') {
    const clipId = `puzzle-clip-${id}`;
    const path = shape === 'puzzle-left' ? PUZZLE_PATH_LEFT : PUZZLE_PATH;
    return (
      <div
        className={`img-ph-puzzle ${className ?? ''}`}
        style={{ aspectRatio: ratio, clipPath: `url(#${clipId})` }}
      >
        <svg width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={clipId} clipPathUnits="objectBoundingBox">
              <path d={path} />
            </clipPath>
          </defs>
        </svg>
        <div className="img-ph" role="img" aria-label={`画像プレースホルダー: ${label}`}>
          {inner}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`img-ph ${shape ? `img-ph--${shape}` : ''} ${className ?? ''}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`画像プレースホルダー: ${label}`}
    >
      {inner}
    </div>
  );
}
