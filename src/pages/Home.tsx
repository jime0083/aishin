import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../sections/Hero';
import Loader from '../components/Loader';
import Mission from '../sections/Mission';
import About from '../sections/About';
import ServiceTeaser from '../sections/ServiceTeaser';
import WorksTeaser from '../sections/WorksTeaser';
import InterviewTeaser from '../sections/InterviewTeaser';
import CareerTeaser from '../sections/CareerTeaser';
import EntryCta from '../sections/EntryCta';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);

  // スクロール連動アニメーションの一括登録
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 単体要素のフェードイン
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          },
        );
      });

      // グループ（子要素をずらして表示）
      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        gsap.fromTo(
          Array.from(group.children),
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: 'top 82%' },
          },
        );
      });

      // ミッションの行ごとのマスクリビール（キネティック文字）
      gsap.utils.toArray<HTMLElement>('[data-reveal-line] .mission__line-inner').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        );
      });

      // 数字のカウントアップ
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count ?? 0);
        const decimals = Number(el.dataset.decimals ?? 0);
        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = obj.n.toFixed(decimals);
          },
        });
      });

      // 画像プレースホルダーのマスクリビール（左→右に開く）
      gsap.utils.toArray<HTMLElement>('.img-ph').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 86%' },
          },
        );
      });

      // ENTRYの巨大文字が下から順にせり上がる
      gsap.fromTo(
        '.entry__char',
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'back.out(1.6)',
          stagger: 0.07,
          scrollTrigger: { trigger: '.entry', start: 'top 70%' },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <Loader onReveal={() => setIntroDone(true)} />
      <Hero start={introDone} />
      <Mission />
      <About />
      <ServiceTeaser />
      <WorksTeaser />
      <InterviewTeaser />
      <CareerTeaser />
      <EntryCta />
    </div>
  );
}
