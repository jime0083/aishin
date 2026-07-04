import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import ComingSoon from './pages/ComingSoon';

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
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<ComingSoon title="SERVICE" jp="サービス紹介" />} />
          <Route path="/works" element={<ComingSoon title="WORKS" jp="実績一覧" />} />
          <Route path="/interview" element={<ComingSoon title="INTERVIEW" jp="社員インタビュー" />} />
          <Route path="/career" element={<ComingSoon title="CAREER" jp="キャリアサポート" />} />
          <Route path="/entry" element={<ComingSoon title="ENTRY" jp="採用エントリー" />} />
          <Route path="*" element={<ComingSoon title="NOT FOUND" jp="ページが見つかりません" />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
