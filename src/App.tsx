import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { useState } from 'react'

import './App.scss'
import Login from './pages/Login'
import Reflections from './pages/Reflections'
import ReflectionPage from './pages/ReflectionPage'
import Home from './pages/Home'
import Navbar from './Components/Navbar'

function App() {
  const [userId, setUserId] = useState<string | null>('123')
  return (
    <div>
      <h1>🎉 App is Working!</h1>
      <p>If you can see this, React is running correctly.</p>
      <Router>
        <div>
          <Navbar/>
          <Routes>
            <Route path="/pages/home" element={<Home userId={userId}/>} />
            <Route path="/" element={<Login userId={userId} setuserId={setUserId} />} />
            <Route path="/pages/reflections" element={<Reflections userId={userId}/>} />
            <Route path="/pages/reflection" element={<ReflectionPage />} />
            <Route path="/reflection" element={<ReflectionPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
