import { useEffect, type RefObject } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';

/**
 * 下層ページヒーロー用の物理演算（matter-js）。
 * stage 内の .hero__piece 要素を上から降らせ、ドラッグ可能にする。
 * トップページの Hero と同じ挙動（スクロール阻害なし・画面外で停止・リサイズ対応）。
 */
export default function usePhysicsPieces(
  stageRef: RefObject<HTMLElement | null>,
  piecesRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const stage = stageRef.current;
    const piecesWrap = piecesRef.current;
    if (!stage || !piecesWrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = Array.from(piecesWrap.querySelectorAll<HTMLElement>('.hero__piece'));
    if (elements.length === 0) return;
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
      const y = -h - i * gsap.utils.random(90, 180) - 160;
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
  }, [stageRef, piecesRef]);
}
