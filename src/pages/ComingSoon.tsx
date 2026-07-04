import { Link } from 'react-router-dom';

type Props = {
  title: string;
  jp: string;
};

/** 下層ページの仮置き（トップページ承認後に本実装予定） */
export default function ComingSoon({ title, jp }: Props) {
  return (
    <section className="coming-soon">
      <div className="container">
        <h1 className="coming-soon__title">{title}</h1>
        <p className="coming-soon__jp">{jp}</p>
        <p className="coming-soon__note">このページは現在準備中です。</p>
        <Link to="/" className="btn-line">
          ← BACK TO TOP
        </Link>
      </div>
    </section>
  );
}
