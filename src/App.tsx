import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { useState } from 'react'

import './App.scss'
import Login from './pages/Login'
import Reflections from './pages/Reflections'
import Home from './pages/Home'
import Navbar from './Components/Navbar'

function App() {
  const [userId, setUserId] = useState<string | null>('123')
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/pages/home" element={<Home userId={userId}/>} />
        <Route path="/" element={<Login userId={userId} setuserId={setUserId} />} />
        <Route path="/pages/reflections" element={<Reflections userId={userId}/>} />
      </Routes>
    </Router>
  )
}

export default App
