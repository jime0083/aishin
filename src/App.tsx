import { Suspense, lazy, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import FloatingBg from './components/FloatingBg';
import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';

// 下層ページはコード分割して初期ロードを軽く保つ
const Service = lazy(() => import('./pages/Service'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <CustomCursor />
      <FloatingBg />
      <Header />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/works" element={<ComingSoon title="WORKS" jp="実績一覧" />} />
            {/* インタビューは一覧ページを持たず、トップから個別詳細ページへ遷移する仕様 */}
            <Route
              path="/interview/:id"
              element={<ComingSoon title="INTERVIEW" jp="社員インタビュー" />}
            />
            <Route path="/career" element={<ComingSoon title="CAREER" jp="キャリアサポート" />} />
            <Route path="/entry" element={<ComingSoon title="ENTRY" jp="採用エントリー" />} />
            <Route path="*" element={<ComingSoon title="NOT FOUND" jp="ページが見つかりません" />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </HashRouter>
  );
}
