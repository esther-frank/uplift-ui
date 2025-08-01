import { useState, useEffect } from 'react'

type tokenData = {
  userToken: string | null
  setUserToken: (userToken: string | null) => void
}

const useVerification = ({ userToken, setUserToken }: tokenData) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null) // null means "not checked yet"

  useEffect(() => {
    if (!userToken) {
      setIsLoggedIn(false)
      return
    }

    const tokenVerification = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_LOCAL_API_URL}/auth/verify`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`
            }
          }
        )

        const userData = await response.json()

        if (response.ok) {
          localStorage.setItem('userObject', JSON.stringify(userData))
          console.log('token good')
          setIsLoggedIn(true)
        } else {
          setUserToken(null)
          localStorage.setItem('token', '')
          console.log('token invalid')
          setIsLoggedIn(false)
        }
      } catch (err) {
        setUserToken(null)
        localStorage.setItem('token', '')
        console.error(err)
        setIsLoggedIn(false)
      }
    }

    tokenVerification()
  }, [userToken, setUserToken])

  return isLoggedIn // boolean | null
}

export default useVerification
