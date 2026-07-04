import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type Props = {
  /** 画面のワイプが始まり、下のコンテンツが見え始めるタイミングで呼ばれる */
  onReveal: () => void;
};

const BRAND = 'AISHIN';

/** アクセス直後のローディング演出（カウンター→マスクワイプでFVへ） */
export default function Loader({ onReveal }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef(onReveal);
  revealRef.current = onReveal;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.style.display = 'none';
      revealRef.current();
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { n: 0 };
      const countEl = root.querySelector<HTMLElement>('.loader__count-num');

      const tl = gsap.timeline({
        onComplete: () => {
          root.style.display = 'none';
        },
      });

      tl.fromTo(
        '.loader__brand-char',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
        0,
      )
        .fromTo(
          '.loader__tag',
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'none' },
          0.2,
        )
        .to(
          counter,
          {
            n: 100,
            duration: 1.3,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countEl) countEl.textContent = String(Math.round(counter.n));
            },
          },
          0.1,
        )
        .to('.loader__mark', { rotate: 372, duration: 1.5, ease: 'power2.inOut' }, 0)
        // ワイプ開始: 紙色パネル→オレンジパネルの順に上へ抜ける
        .add(() => revealRef.current(), 1.55)
        .to('.loader__panel--paper', { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, 1.5)
        .to('.loader__panel--orange', { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, 1.62);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="loader" ref={rootRef} aria-hidden="true">
      <div className="loader__panel loader__panel--orange" />
      <div className="loader__panel loader__panel--paper">
        <div className="loader__brand">
          <span className="loader__mark" />
          {Array.from(BRAND).map((ch, i) => (
            <span key={i} className="loader__brand-char">
              {ch}
            </span>
          ))}
        </div>
        <p className="loader__count">
          <span className="loader__count-num">0</span>
          <span className="loader__count-unit">%</span>
        </p>
        <p className="loader__tag">INVENTING THE MISSING PIECE</p>
      </div>
    </div>
  );
}
