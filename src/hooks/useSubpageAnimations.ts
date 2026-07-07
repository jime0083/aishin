import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Options = {
  /** スクロール速度連動のskewを掛ける対象セレクタ（カンマ区切り） */
  skewTargets?: string;
};

/**
 * 下層ページ共通のスクロール連動アニメーション一括登録。
 * トップページ（Home.tsx）と同じ演出言語（data-reveal / data-reveal-group /
 * .section__title / [data-giant] / [data-count] / .img-ph / .entry__char）を提供する。
 */
export default function useSubpageAnimations({ skewTargets }: Options = {}) {
  useLayoutEffect(() => {
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

      // グループ（子要素を回転・スケール付きでずらして表示）
      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        gsap.fromTo(
          Array.from(group.children),
          {
            opacity: 0,
            y: 72,
            scale: 0.94,
            rotate: () => gsap.utils.random(-4, 4),
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.13,
            scrollTrigger: { trigger: group, start: 'top 82%' },
          },
        );
      });

      // セクション見出しのマスクリビール
      gsap.utils.toArray<HTMLElement>('.section__title').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)', y: 36 },
          {
            clipPath: 'inset(0 0 -20% 0)',
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 86%' },
          },
        );
      });

      // 巨大アウトライン英字をスクロールで横に流す
      gsap.utils.toArray<HTMLElement>('[data-giant]').forEach((el) => {
        const dir = el.dataset.giant === 'left' ? 1 : -1;
        gsap.fromTo(
          el,
          { xPercent: 6 * dir },
          {
            xPercent: -10 * dir,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
      });

      // スクロール速度に連動したskew（歪み）演出
      if (skewTargets) {
        const targets = gsap.utils.toArray<HTMLElement>(skewTargets);
        if (targets.length > 0) {
          const setters = targets.map((el) => gsap.quickSetter(el, 'skewY', 'deg'));
          const proxy = { value: 0 };
          const apply = () => setters.forEach((set) => set(proxy.value));
          ScrollTrigger.create({
            onUpdate: (self) => {
              const velocity = gsap.utils.clamp(-6, 6, self.getVelocity() / -400);
              if (Math.abs(velocity) > Math.abs(proxy.value)) {
                proxy.value = velocity;
                gsap.to(proxy, {
                  value: 0,
                  duration: 0.8,
                  ease: 'power3.out',
                  overwrite: true,
                  onUpdate: apply,
                });
              }
            },
          });
        }
      }

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

      // ENTRY CTA の巨大文字が下から順にせり上がる（EntryCta 使用ページのみ）
      const entryChars = gsap.utils.toArray<HTMLElement>('.entry__char');
      if (entryChars.length > 0) {
        gsap.fromTo(
          entryChars,
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
      }
    });

    return () => mm.revert();
  }, [skewTargets]);
}
