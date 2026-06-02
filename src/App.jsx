import { Routes, Route } from 'react-router-dom'
import './App.css'
import '@/styles/reset.css'
import Home from '@/routes/Home'
import Mypage from '@/routes/Mypage'
import Practice from '@/routes/Practice'

function App() {

  return (
    <Routes>
      <Route path="/mypage/*" element={<Mypage />} />
      <Route path="/practice/*" element={<Practice />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  )
}

export default App
