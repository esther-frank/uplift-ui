import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import './App.scss'
import Login from './pages/Login/Login'
import Reflections from './pages/Reflections'
// import ReflectionPage from './pages/ReflectionPage'
import Home from './pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'

function App() {
  const [userId, setUserId] = useState<string | null>('123')
  const [showNavItems, setShowNavItems] = useState<boolean>(false)
  return (
    <Router>
      <Navbar showItems={showNavItems} />
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
          path="/pages/reflections"
          element={<Reflections userId={userId} />}
        />
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
          path="/pages/reflections"
          element={<Reflections userId={userId} />}
        />
      </Routes>
    </Router>
  )
}

export default App
