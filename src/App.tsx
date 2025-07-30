import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import './App.scss'
import Login from './pages/Login/Login'
import Reflection from './pages/Reflection/Reflection'
import Home from './pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'

function App() {
  const userIdValue = localStorage.getItem('userId')
  const initialUserId = userIdValue ? userIdValue : null
  const [userId, setUserId] = useState<string | null>(initialUserId)
  const showValue = userId ? true : false
  const [showNavItems, setShowNavItems] = useState<boolean>(showValue)
  return (
    <Router>
      <Navbar showItems={showNavItems} />
      <Routes>
        <Route path="/pages/home" element={<Home userId={userId} />} />
        <Route
          path="/"
          element={
            <Login
              userId={userId}
              setuserId={setUserId}
              setShowNavItems={setShowNavItems}
            />
          }
        />
        <Route
          path="/pages/reflection"
          element={<Reflection />}
        />
      </Routes>
    </Router>
  )
}

export default App
