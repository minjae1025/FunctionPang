import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import Detail from '@/pages/Detail';
import OnBoarding from '@/pages/OnBoarding';

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<OnBoardingRoute />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const OnBoardingRoute = () => {
  const navigate = useNavigate();

  return <OnBoarding onFinish={() => navigate('/detail', { replace: true })} />;
};

export default Home;
