import { Routes, Route } from 'react-router-dom';
import HomeMain from '../pages/HomeMain';
import PracticeTyping from '../pages/PracticeTyping';
import PracticeSubjective from '../pages/PracticeSubjective';
import PracticeFillBlank from '../pages/PracticeFillBlank';

const Practice = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeMain />} />
      <Route path="/typing" element={<PracticeTyping />} />
      <Route path="/subjective" element={<PracticeSubjective />} />
      <Route path="/fill-blank" element={<PracticeFillBlank />} />
    </Routes>
  );
};

export default Practice;
