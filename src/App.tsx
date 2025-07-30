import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import './App.module.scss'
import Login from './pages/Login/Login'
import Reflection from './pages/Reflection/Reflection'
import Home from './pages/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import ReflectionList from './pages/ReflectionList/ReflectionList'

function App() {

  const [userToken, setUserToken] = useState<string | null>(null)

  async function tokenVerification(){
    try {
        const response = await fetch('http://185.150.1.9:8081/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })

        const userData = await response.text()

        if (response.ok) {
          localStorage.setItem('userObject', JSON.stringify(userData))
          setUserToken(JSON.stringify(userData))
          console.log("token good")
        } else {
          setUserToken(null)
          localStorage.setItem('token', "")
          console.log("token invalid")
        }
      } catch (err) {
          setUserToken(null)
          localStorage.setItem('token', "")
          console.error(err)
      }
  }

  tokenVerification();

  const userTokenValue = localStorage.getItem('token')
  const showValue = userTokenValue ? true : false
  const [showNavItems, setShowNavItems] = useState<boolean>(showValue)

  return (
    <Router>
      <Navbar showItems={showNavItems} />
      <Routes>
        <Route path="/pages/home" element={<Home userToken={userToken} />} />
        <Route
          path="/"
          element={
            <Login
              userToken={userToken}
              setUserToken={setUserToken}
              setShowNavItems={setShowNavItems}
            />
          }
        />
        <Route
          path="/pages/reflection"
          element={<Reflection />}
        />
        <Route
          path="/pages/reflectionList"
          element={<ReflectionList />}
        />
      </Routes>
    </Router>
  )
}

export default App
