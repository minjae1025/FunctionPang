import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import '@/styles/reset.css';
import Index from '@/routes/Index';
import Mypage from '@/routes/Mypage';
import Home from '@/routes/Home';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // 세션 스토리지에서 리다이렉트할 경로가 있는지 확인
    const redirect = sessionStorage.redirect;
    if (redirect) {
      delete sessionStorage.redirect; // 사용 후 삭제

      // 베이스 경로 제거 ('/FunctionPang')
      const path = redirect.replace('/FunctionPang', '');

      navigate(path);
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/mypage/*" element={<Mypage />} />
      <Route path="/home/*" element={<Home />} />
      <Route path="/*" element={<Index />} />
    </Routes>
  );
}

export default App;
