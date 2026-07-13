import { Link } from 'react-router-dom';

// INTERVIEW は一覧ページ廃止に伴いリンクから削除（トップのセクションから各詳細へ遷移）
const FOOTER_LINKS = [
  { to: '/', label: 'ABOUT' },
  { to: '/service', label: 'SERVICE' },
  { to: '/works', label: 'WORKS' },
  { to: '/career', label: 'CAREER' },
  { to: '/entry', label: 'ENTRY' },
];

export default function Footer() {
  return (
    <footer className="footer">
      {/* 他セクションと同じ .container グリッドに揃える */}
      <div className="container">
        <div className="footer__top">
          <div>
            <Link to="/" className="footer__logo" aria-label="株式会社アイシン">
              <img
                src={`${import.meta.env.BASE_URL}images/logo-footer.png`}
                alt="株式会社アイシン"
                className="footer__logo-img"
              />
            </Link>
          </div>
          <nav className="footer__nav" aria-label="フッターナビゲーション">
            {FOOTER_LINKS.map((item) => (
              <Link key={item.to} to={item.to} className="footer__link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="footer__bottom">
          <small>© {new Date().getFullYear()} Aishin Inc. All Rights Reserved.</small>
        </div>
      </div>
    </footer>
  );
}
