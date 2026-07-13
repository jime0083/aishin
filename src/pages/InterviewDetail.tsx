import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import GiantWord from '../components/GiantWord';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Marquee from '../components/Marquee';
import WordPiece, { WORD_PIECES } from '../components/WordPiece';
import EntryCta from '../sections/EntryCta';
import ComingSoon from './ComingSoon';
import usePhysicsPieces from '../hooks/usePhysicsPieces';
import useSubpageAnimations from '../hooks/useSubpageAnimations';
import { INTERVIEWS } from '../data/interviews';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * 社員インタビュー詳細ページ（/interview/:id）。
 * 構成トレース元: recruit.positive.co.jp/member/member_07
 * 大型ビジュアル → プロフィール・経歴 → Q&A3本＋写真 → 他社員リンク → ENTRY CTA
 */
export default function InterviewDetail() {
  const { id } = useParams<{ id: string }>();
  const member = INTERVIEWS.find((m) => m.id === id);

  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<HTMLDivElement>(null);

  usePhysicsPieces(stageRef, piecesRef);
  useSubpageAnimations({ skewTargets: '.itv-qa__body', refreshKey: id });

  // ヒーローの一言（quote）を1文字ずつキネティック出現させる
  useEffect(() => {
    const root = heroRef.current;
    if (!root || !member) return;
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>('.itv-hero__char');
      const subs = ['.itv-hero__eyebrow', '.itv-hero__name', '.itv-hero__role'];
      if (prefersReducedMotion()) {
        gsap.set(chars, { opacity: 1, yPercent: 0, rotate: 0 });
        gsap.set(subs, { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.8)' } });
      tl.fromTo(
        '.itv-hero__eyebrow',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        0,
      )
        .fromTo(
          chars,
          { opacity: 0, yPercent: 130, rotate: () => gsap.utils.random(-18, 18) },
          { opacity: 1, yPercent: 0, rotate: 0, duration: 0.8, stagger: 0.028 },
          0.1,
        )
        .fromTo(
          ['.itv-hero__name', '.itv-hero__role'],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
          '-=0.4',
        );
    }, root);
    return () => ctx.revert();
  }, [member]);

  if (!member) {
    return <ComingSoon title="NOT FOUND" jp="ページが見つかりません" />;
  }

  const others = INTERVIEWS.filter((m) => m.id !== member.id);
  const reduced = typeof window !== 'undefined' && prefersReducedMotion();

  return (
    <div key={member.id}>
      {/* 大型ビジュアル（ポートレート＋一言のキネティックタイポ） */}
      <section className="itv-hero" ref={heroRef} aria-label={`${member.name} インタビュー`}>
        <GiantWord text="INTERVIEW" side="right" />
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
        <div className="container itv-hero__grid">
          <div className="itv-hero__media">
            {/* FVのポートレートは縦長の楕円で切り抜く（P-021） */}
            <ImagePlaceholder
              id={member.portraitImgId}
              label={member.portraitImgLabel}
              ratio="3 / 4"
              shape="ellipse"
            />
          </div>
          <div className="itv-hero__body">
            <p className="itv-hero__eyebrow">INTERVIEW {member.id}</p>
            <h1 className="itv-hero__quote">
              {Array.from(member.quote).map((ch, i) => (
                <span key={`${ch}-${i}`} className="itv-hero__char">
                  {ch}
                </span>
              ))}
            </h1>
            <p className="itv-hero__name">
              {member.name} <span className="itv-hero__name-en">{member.nameEn}</span>
            </p>
            <p className="itv-hero__role">
              {member.position} / {member.joinYear}入社
            </p>
          </div>
        </div>
      </section>

      {/* プロフィール・経歴 */}
      <section className="section itv-profile section--tinted">
        <div className="container">
          <div className="itv-profile__card" data-reveal>
            <p className="about__profile-title">PROFILE</p>
            <dl>
              <div className="about__profile-row">
                <dt>氏名</dt>
                <dd>
                  {member.name}（{member.nameEn}）
                </dd>
              </div>
              <div className="about__profile-row">
                <dt>入社</dt>
                <dd>{member.joinYear}</dd>
              </div>
              <div className="about__profile-row">
                <dt>役職</dt>
                <dd>{member.position}</dd>
              </div>
              <div className="about__profile-row">
                <dt>経歴</dt>
                <dd>{member.career}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Q&A 3本（見出し＋本文＋写真） */}
      {member.qa.map((qa, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={qa.heading} className="section itv-qa">
            <div className="container">
              <p className="section__eyebrow" data-reveal>
                <span className="section__eyebrow-num">{`0${i + 1}`}</span> QUESTION
              </p>
              <h2 className="section__title itv-qa__heading">{qa.heading}</h2>
              <div className={`itv-qa__grid ${qa.photo ? '' : 'itv-qa__grid--single'}`}>
                <div className="itv-qa__body" data-reveal>
                  {qa.paragraphs.map((p) => (
                    <p key={p.slice(0, 12)}>{p}</p>
                  ))}
                </div>
                {qa.photo && (
                  <div className={`itv-qa__media ${flip ? 'itv-qa__media--first' : ''}`} data-reveal>
                    <ImagePlaceholder
                      id={qa.photo.imgId}
                      label={qa.photo.imgLabel}
                      ratio="4 / 3"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* 他社員へのリンク */}
      <section className="section itv-others section--tinted">
        <GiantWord text="PEOPLE" side="left" />
        <div className="container">
          <p className="section__eyebrow" data-reveal>
            OTHER MEMBERS
          </p>
          <h2 className="section__title">ほかの社員も知る。</h2>
          <div className="interview__cards itv-others__cards" data-reveal-group>
            {others.map((m) => (
              <Link to={`/interview/${m.id}`} key={m.id} className="interview__card">
                <ImagePlaceholder id={m.portraitImgId} label={m.portraitImgLabel} ratio="3 / 4" />
                <p className="interview__quote">“{m.quote}”</p>
                <p className="interview__name">{m.name}</p>
                <p className="interview__role">
                  {m.position} / {m.joinYear}入社
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Marquee text="MEET YOUR FUTURE TEAM — " reverse tilt />
      <EntryCta />
    </div>
  );
}
