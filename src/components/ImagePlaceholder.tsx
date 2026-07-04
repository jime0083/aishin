type Props = {
  id: string;
  label: string;
  /** aspect-ratio (e.g. "4 / 3") */
  ratio?: string;
  className?: string;
};

/**
 * 画像差し込み予定地のフレーム。
 * img.txt の一覧と同じ ID を表示し、後から実画像に置き換える。
 */
export default function ImagePlaceholder({ id, label, ratio = '4 / 3', className }: Props) {
  return (
    <div
      className={`img-ph ${className ?? ''}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`画像プレースホルダー: ${label}`}
    >
      <svg className="img-ph__cross" aria-hidden="true">
        <line x1="0" y1="0" x2="100%" y2="100%" />
        <line x1="100%" y1="0" x2="0" y2="100%" />
      </svg>
      <span className="img-ph__id">{id}</span>
      <span className="img-ph__label">{label}</span>
    </div>
  );
}
