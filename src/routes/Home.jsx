import { Routes, Route } from 'react-router-dom';

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page (Main)</div>} />
      {/* Home 담당자가 여기에 서브 라우트를 자유롭게 추가할 수 있습니다. */}
    </Routes>
  );
};

export default Home;
