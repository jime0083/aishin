type Props = {
  text: string;
  /** 配置: 左上 or 右上 */
  side?: 'left' | 'right';
};

/** セクション背景の巨大アウトライン英字（スクロールで横に流れる） */
export default function GiantWord({ text, side = 'right' }: Props) {
  return (
    <span className={`giant-word giant-word--${side}`} data-giant={side} aria-hidden="true">
      {text}
    </span>
  );
}
