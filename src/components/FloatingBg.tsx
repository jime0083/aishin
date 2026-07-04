import { useEffect, useRef } from 'react';

/**
 * ページ全体の背景アニメーションレイヤー。
 * 浮遊するシェイプ（グロー円・リング・ピース片・十字）が常時ゆらぎ、
 * スクロールに応じて各シェイプが異なる速度で視差移動（ループ）する。
 */

type Shape = {
  kind: 'glow' | 'glow2' | 'ring' | 'ring-dash' | 'square' | 'square2' | 'plus';
  left: string;
  top: number; // 基準位置（vh基準の%）
  speed: number; // スクロール視差の速度係数
  float: number; // 浮遊アニメの種類（1〜3）
};

const SHAPES: Shape[] = [
  { kind: 'glow', left: '4%', top: 18, speed: 0.12, float: 1 },
  { kind: 'glow2', left: '72%', top: 68, speed: 0.2, float: 2 },
  { kind: 'glow', left: '58%', top: 8, speed: 0.3, float: 3 },
  { kind: 'ring', left: '85%', top: 30, speed: 0.42, float: 1 },
  { kind: 'ring-dash', left: '10%', top: 82, speed: 0.26, float: 2 },
  { kind: 'ring', left: '30%', top: 50, speed: 0.5, float: 3 },
  { kind: 'square', left: '78%', top: 90, speed: 0.6, float: 1 },
  { kind: 'square2', left: '20%', top: 4, speed: 0.55, float: 2 },
  { kind: 'square', left: '46%', top: 74, speed: 0.36, float: 3 },
  { kind: 'plus', left: '90%', top: 58, speed: 0.68, float: 2 },
  { kind: 'plus', left: '38%', top: 26, speed: 0.46, float: 1 },
];

export default function FloatingBg() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = Array.from(root.children) as HTMLElement[];
    let rafId = 0;
    let lastY = -1;

    // スクロール視差: 各シェイプを速度係数つきで移動し、画面外に出たら反対側へループ
    const update = () => {
      const scrollY = window.scrollY;
      if (scrollY !== lastY) {
        lastY = scrollY;
        const vh = window.innerHeight;
        const range = vh + 600;
        items.forEach((el, i) => {
          const shape = SHAPES[i];
          const baseY = (shape.top / 100) * vh;
          let y = (baseY - scrollY * shape.speed) % range;
          if (y < -300) y += range;
          el.style.transform = `translateY(${y - baseY}px)`;
        });
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="floating-bg" ref={rootRef} aria-hidden="true">
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className="floating-bg__item"
          style={{ left: s.left, top: `${s.top}%` }}
        >
          <span className={`floating-bg__shape floating-bg__shape--${s.kind} f-float-${s.float}`} />
        </div>
      ))}
    </div>
  );
}
