import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import Detail from '@/pages/Detail';
import OnBoarding from '@/pages/OnBoarding';

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<OnBoardingRoute />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* Home 담당자가 여기에 서브 라우트를 자유롭게 추가할 수 있습니다. */}
    </Routes>
  );
};

const OnBoardingRoute = () => {
  const navigate = useNavigate();

  return <OnBoarding onFinish={() => navigate('/detail', { replace: true })} />;
};

export default Home;
