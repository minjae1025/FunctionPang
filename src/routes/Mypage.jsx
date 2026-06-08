import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MypageMain from '../pages/MypageMain';

const Mypage = () => {

  return (
    <Routes>
      <Route path="/" element={<MypageMain />} />
    </Routes>
  )
}

export default Mypage;
