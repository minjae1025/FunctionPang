import { Routes, Route } from 'react-router-dom'
import './App.css'
import '@/styles/reset.css'
import Index from '@/routes/Index'
import Mypage from '@/routes/Mypage'
import Home from '@/routes/Home'

function App() {

  return (
    <Routes>
      <Route path="/mypage/*" element={<Mypage />} />
      <Route path="/home/*" element={<Home />} />
      <Route path="/*" element={<Index />} />
    </Routes>
  )
}

export default App
