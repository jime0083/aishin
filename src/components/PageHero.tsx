import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import GiantWord from './GiantWord';
import WordPiece, { WORD_PIECES } from './WordPiece';
import usePhysicsPieces from '../hooks/usePhysicsPieces';

type Props = {
  /** 英語見出し（キネティック出現） */
  title: string;
  /** 日本語サブタイトル（任意） */
  titleJa?: string;
  /** 導入文（任意） */
  lead?: string;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 下層ページ共通ヒーロー。
 * 英語見出しの1文字ずつのドロップイン＋浮遊ループ、背景の巨大アウトライン英字、
 * 物理演算のパズルピース型ワード（ドラッグ可能）で構成する。
 */
export default function PageHero({ title, titleJa, lead }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<HTMLDivElement>(null);

  usePhysicsPieces(stageRef, piecesRef);

  // キネティックタイポグラフィ（ドロップイン→浮遊ループ）
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>('.page-hero__char');
      // titleJa / lead は任意のため、存在する要素のみアニメーション対象にする
      const subTargets = ['.page-hero__ja', '.page-hero__lead'].filter((sel) =>
        root.querySelector(sel),
      );
      if (prefersReducedMotion()) {
        gsap.set(chars, { opacity: 1, yPercent: 0, rotate: 0 });
        gsap.set(['.page-hero__eyebrow', ...subTargets], { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.8)' } });
      tl.fromTo(
        '.page-hero__eyebrow',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        0,
      ).fromTo(
        chars,
        {
          opacity: 0,
          yPercent: 130,
          rotate: () => gsap.utils.random(-26, 26),
        },
        {
          opacity: 1,
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          stagger: 0.06,
        },
        0.1,
      );
      subTargets.forEach((sel) => {
        tl.fromTo(
          sel,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.5',
        );
      });
      // 出現後もタイトルがゆっくり浮遊し続ける
      tl.to('.page-hero__title', {
        y: -8,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, root);
    return () => ctx.revert();
  }, [title]);

  const reduced = typeof window !== 'undefined' && prefersReducedMotion();

  return (
    <section className="page-hero" ref={rootRef} aria-label={`${title} ページタイトル`}>
      <GiantWord text={title} side="right" />

      {/* 落下ピースはトップページと共通の WORD_PIECES を使用（P-020） */}
      <div className="page-hero__stage" ref={stageRef} data-cursor-label="DRAG">
        <div
          className={`hero__pieces ${reduced ? 'hero__pieces--static' : ''}`}
          ref={piecesRef}
          aria-hidden="true"
        >
          {WORD_PIECES.map((p) => (
            <WordPiece key={p.text} text={p.text} variant={p.variant} />
          ))}
        </div>
      </div>

      <div className="container page-hero__content">
        <p className="page-hero__eyebrow">AISHIN INC. — RECRUIT SITE</p>
        <h1 className="page-hero__title">
          <span className="page-hero__line">
            {Array.from(title).map((ch, i) => (
              <span key={`${ch}-${i}`} className="page-hero__char">
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </span>
        </h1>
        {titleJa && <p className="page-hero__ja">{titleJa}</p>}
        {lead && <p className="page-hero__lead">{lead}</p>}
      </div>
    </section>
  );
}
