import { Routes, Route } from 'react-router-dom';

const Practice = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Practice Page (Main)</div>} />
      {/* Practice 담당자가 여기에 서브 라우트를 자유롭게 추가할 수 있습니다. */}
    </Routes>
  );
};

export default Practice;
