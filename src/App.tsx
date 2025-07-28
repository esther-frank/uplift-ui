import { BrowserRouter as Router, Routes, Route } from 'react-router'

import './App.scss'
import Login from './pages/Login'
import Reflections from './pages/Reflections'
import Home from './pages/Home'
import Navbar from './Components/Navbar'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/pages/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/pages/reflections" element={<Reflections />} />
      </Routes>
    </Router>
  )
}

export default App
