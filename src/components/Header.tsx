import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

// INTERVIEW は一覧ページ廃止に伴いナビから削除（トップのセクションから各詳細へ遷移）
const NAV_ITEMS = [
  { to: '/', label: 'ABOUT' },
  { to: '/service', label: 'SERVICE' },
  { to: '/works', label: 'WORKS' },
  { to: '/career', label: 'CAREER' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo" onClick={close} aria-label="AISHIN トップページ">
          {/* [IMG-LOGO] ロゴ画像に差し替え予定 */}
          <span className="header__logo-mark" aria-hidden="true" />
          AISHIN
        </Link>

        <nav className="header__nav" aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className="header__link" end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/entry" className="header__entry">
            ENTRY
          </Link>
        </nav>

        <button
          type="button"
          className="header__burger"
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="header__drawer" aria-hidden={!open}>
        <nav aria-label="モバイルナビゲーション">
          {NAV_ITEMS.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="header__drawer-link"
              style={{ transitionDelay: `${open ? 80 + i * 50 : 0}ms` }}
              onClick={close}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/entry"
            className="header__drawer-link header__drawer-link--entry"
            style={{ transitionDelay: `${open ? 80 + NAV_ITEMS.length * 50 : 0}ms` }}
            onClick={close}
          >
            ENTRY →
          </Link>
        </nav>
      </div>
    </header>
  );
}
