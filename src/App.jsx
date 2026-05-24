import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EventPage from './pages/EventPage'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
// import CustomCursor from './components/CustomCursor'; // استدعاء الماوس الجديد
import AnimatedBackground from './components/AnimatedBackground'; // استدعاء الخلفية
function App() {
  return (
<BrowserRouter>
      {/* استدعاء المكونات الإبداعية خارج الـ Routes لتظل ثابتة وتتحرك في كل مكان */}
      {/* <CustomCursor /> */}
      <AnimatedBackground />

      <div className="relative z-[12]"> {/* طبقة محتوى الصفحات فوق الخلفية */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/:eventId" element={<AdminPage />} />
          <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App