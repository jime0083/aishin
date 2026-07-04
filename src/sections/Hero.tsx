import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';
import LiquidBg from '../components/LiquidBg';
import Marquee from '../components/Marquee';

/** 物理演算で降ってくる「言葉のピース」 */
const WORD_PIECES: { text: string; variant: string }[] = [
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

const TITLE_LINES = ['まだ見ぬピースを', '発明する'];
const ACCENT_CHARS = new Set(['ピ', 'ー', 'ス']);

type Props = {
  /** ローディング演出が明けたら true（各アニメーションを開始） */
  start: boolean;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Hero({ start }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // キネティックタイポグラフィ（縦書きタイトルのドロップイン）
  useEffect(() => {
    if (!contentRef.current || !start) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>('.hero__char');
      if (reduced) {
        gsap.set(chars, { opacity: 1, y: 0, rotate: 0 });
        gsap.set(['.hero__sub', '.hero__lead', '.hero__scroll-cue'], { opacity: 1, x: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.8)' } });
      tl.fromTo(
        chars,
        {
          opacity: 0,
          y: () => gsap.utils.random(-90, -50),
          rotate: () => gsap.utils.random(-28, 28),
        },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.85,
          stagger: 0.06,
        },
        0.1,
      )
        .fromTo(
          '.hero__lead',
          { opacity: 0, x: 24 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.5',
        )
        .fromTo(
          '.hero__sub',
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.55',
        )
        .fromTo(
          '.hero__scroll-cue',
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'none' },
          '-=0.2',
        );
    }, contentRef);
    return () => ctx.revert();
  }, [start]);

  // 物理演算（matter-js）: ピースの落下・ドラッグ
  useEffect(() => {
    const stage = stageRef.current;
    const piecesWrap = piecesRef.current;
    if (!stage || !piecesWrap || !start || prefersReducedMotion()) return;

    const elements = Array.from(
      piecesWrap.querySelectorAll<HTMLElement>('.hero__piece'),
    );
    const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create({ gravity: { x: 0, y: 1.1 } });
    let width = stage.clientWidth;
    let height = stage.clientHeight;

    const wallOpts = { isStatic: true, friction: 0.8 } as const;
    let floor = Bodies.rectangle(width / 2, height + 60, width * 2, 120, wallOpts);
    let wallL = Bodies.rectangle(-60, height / 2, 120, height * 4, wallOpts);
    let wallR = Bodies.rectangle(width + 60, height / 2, 120, height * 4, wallOpts);
    Composite.add(engine.world, [floor, wallL, wallR]);

    // 各DOM要素のサイズを測って剛体を生成し、画面上方からランダムに降らせる
    const bodies = elements.map((el, i) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const x = gsap.utils.random(w, Math.max(w + 1, width - w));
      const y = -h - i * gsap.utils.random(90, 180) - 200;
      return Bodies.rectangle(x, y, w, h, {
        chamfer: { radius: Math.min(h / 2 - 2, 26) },
        restitution: 0.45,
        friction: 0.4,
        frictionAir: 0.012,
        angle: gsap.utils.random(-0.5, 0.5),
      });
    });
    Composite.add(engine.world, bodies);

    // ドラッグ操作（スクロールを妨げないようホイール/タッチのリスナーは除去）
    const mouse = Mouse.create(stage);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.15, damping: 0.1, render: { visible: false } },
    });
    const mouseAny = mouse as unknown as {
      mousewheel: EventListener;
      mousemove: EventListener;
      mousedown: EventListener;
      mouseup: EventListener;
    };
    stage.removeEventListener('wheel', mouseAny.mousewheel);
    stage.removeEventListener('touchmove', mouseAny.mousemove);
    stage.removeEventListener('touchstart', mouseAny.mousedown);
    stage.removeEventListener('touchend', mouseAny.mouseup);
    Composite.add(engine.world, mouseConstraint);

    // 独自rAFループ: 物理更新とDOM同期（画面外では停止してCPUを節約）
    let visible = true;
    let rafId = 0;
    let lastTime = performance.now();
    const tick = (time: number) => {
      const delta = Math.min(time - lastTime, 33.33);
      lastTime = time;
      if (visible) {
        Engine.update(engine, delta);
        for (let i = 0; i < bodies.length; i += 1) {
          const b = bodies[i];
          const el = elements[i];
          const w = el.offsetWidth;
          const h = el.offsetHeight;
          el.style.transform = `translate(${b.position.x - w / 2}px, ${b.position.y - h / 2}px) rotate(${b.angle}rad)`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      lastTime = performance.now();
    });
    observer.observe(stage);

    // リサイズ時に壁を作り直し、はみ出したピースを戻す
    const onResize = () => {
      const newW = stage.clientWidth;
      const newH = stage.clientHeight;
      if (newW === width && newH === height) return;
      width = newW;
      height = newH;
      Composite.remove(engine.world, [floor, wallL, wallR]);
      floor = Bodies.rectangle(width / 2, height + 60, width * 2, 120, wallOpts);
      wallL = Bodies.rectangle(-60, height / 2, 120, height * 4, wallOpts);
      wallR = Bodies.rectangle(width + 60, height / 2, 120, height * 4, wallOpts);
      Composite.add(engine.world, [floor, wallL, wallR]);
      bodies.forEach((b) => {
        if (b.position.x < 0 || b.position.x > width) {
          Body.setPosition(b, { x: gsap.utils.random(60, width - 60), y: -120 });
          Body.setVelocity(b, { x: 0, y: 0 });
        }
      });
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      stage.removeEventListener('mousemove', mouseAny.mousemove);
      stage.removeEventListener('mousedown', mouseAny.mousedown);
      stage.removeEventListener('mouseup', mouseAny.mouseup);
    };
  }, [start]);

  const reduced = typeof window !== 'undefined' && prefersReducedMotion();

  return (
    <section className="hero" aria-label="ファーストビュー">
      <div className="hero__main">
        <LiquidBg />

        <div className="hero__stage" ref={stageRef} data-cursor-label="DRAG">
          <div
            className={`hero__pieces ${reduced ? 'hero__pieces--static' : ''}`}
            ref={piecesRef}
            aria-hidden="true"
          >
            {WORD_PIECES.map((p) => (
              <div key={p.text} className={`hero__piece hero__piece--${p.variant}`}>
                {p.text}
              </div>
            ))}
          </div>
        </div>

        <div className="hero__content" ref={contentRef}>
          <div className="hero__vertical">
            <p className="hero__lead">CONSULTING VENTURE</p>
            <h1 className="hero__title">
              {TITLE_LINES.map((line) => (
                <span key={line} className="hero__line">
                  {Array.from(line).map((ch, i) => (
                    <span
                      key={`${ch}-${i}`}
                      className={`hero__char ${ACCENT_CHARS.has(ch) ? 'hero__char--accent' : ''}`}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p className="hero__sub">
              Inventing the Missing Piece<span className="hero__sub-dot">.</span> — AISHIN Inc.
            </p>
          </div>
        </div>

        <div className="hero__scroll-cue" aria-hidden="true">
          <span className="hero__scroll-line" />
          SCROLL
        </div>
      </div>

      <Marquee />
    </section>
  );
}
