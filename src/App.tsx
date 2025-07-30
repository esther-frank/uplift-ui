import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import './App.module.scss'
import Login from './pages/Login/Login'
import Reflection from './pages/Reflection/Reflection'
import Home from './pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import ReflectionList from './pages/ReflectionList/ReflectionList'

function App() {
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem('token')
  )

  return (
    <Router>
      <Navbar showItems={!!userToken} />
      <Routes>
        <Route path="/" element={<Login setUserToken={setUserToken} />} />
        <Route path="/pages/home" element={<Home userToken={userToken} />} />
        <Route path="/pages/reflection" element={<Reflection />} />
        <Route path="/pages/reflectionList" element={<ReflectionList />} />
      </Routes>
    </Router>
  )
}

export default App
