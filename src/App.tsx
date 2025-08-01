import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import './App.module.scss'
import Login from './pages/Login/Login'
import Reflection from './pages/Reflection/Reflection'
import Home from './pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import ReflectionList from './pages/ReflectionList/ReflectionList'
import ReflectionPage from './pages/ReflectionPage/ReflectionPage'

function App() {
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem('token')
  )

  const userData = localStorage.getItem('userObject')
  const jsonUserData = userData ? JSON.parse(userData) : null
  // const doubleJsonUserData = JSON.parse(jsonUserData)

  const userId = jsonUserData?.userId || null

  return (
    <Router>
      <Navbar showItems={!!userToken} />
      <Routes>
        <Route
          path="/"
          element={<Login userToken={userToken} setUserToken={setUserToken} />}
        />
        <Route
          path="/pages/home"
          element={<Home userToken={userToken} setUserToken={setUserToken} />}
        />
        <Route
          path="/pages/reflection"
          element={
            <Reflection
              userId={userId}
              userToken={userToken}
              setUserToken={setUserToken}
            />
          }
        />
        <Route
          path="/pages/reflectionList"
          element={<ReflectionList userId={userId} userToken={userToken} />}
        />
        <Route path="/pages/reflectionList/:id" element={<ReflectionPage />} />
      </Routes>
    </Router>
  )
}

export default App
