import { Link } from 'react-router-dom';

export default function EntryCta() {
  return (
    <section className="entry" id="entry">
      {/* 装飾用の点線枠のみ（背景写真は配置しない方針: P-030） */}
      <div className="entry__bg" aria-hidden="true" />
      <div className="container entry__inner" data-reveal>
        <p className="entry__eyebrow">JOIN US</p>
        <h2 className="entry__title" aria-label="ENTRY">
          {Array.from('ENTRY').map((ch, i) => (
            <span key={i} className="entry__char">
              {ch}
            </span>
          ))}
        </h2>
        <p className="entry__copy">
          あなたという、まだ見ぬピースを待っている。
          <br />
          新卒・第二新卒・35歳以下の中途採用、エントリー受付中。
        </p>
        <Link to="/entry" className="entry__btn">
          ENTRY FORM <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
