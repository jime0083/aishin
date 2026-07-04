import { useEffect, useRef, useState } from 'react';

/** カーソルインタラクション: ドット＋追従リング。ホバー対象で拡大、data-cursor-label でラベル表示 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('has-custom-cursor');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...pos };
    const ringPos = { ...pos };
    let visible = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        'a, button, [data-cursor-label]',
      );
      const label = target?.dataset.cursorLabel ?? '';
      const labelEl = ring.querySelector<HTMLElement>('.cursor__label');
      if (labelEl) labelEl.textContent = label;
      ring.classList.toggle('is-label', Boolean(label));
      ring.classList.toggle('is-hover', Boolean(target) && !label);
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    let rafId = 0;
    const tick = () => {
      dotPos.x += (pos.x - dotPos.x) * 0.4;
      dotPos.y += (pos.y - dotPos.y) * 0.4;
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      dot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px)`;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cursor__dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor__ring" ref={ringRef} aria-hidden="true">
        <span className="cursor__label" />
      </div>
    </>
  );
}
