import { useEffect, useState } from 'react'


const useVerification = ({ userId }: homeProps) => {
   useEffect(() => {
    async function tokenVerification() {
      try {
        const response = await fetch(
          'http://185.150.1.9:8081/api/auth/verify',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        const userData = await response.text()

        if (response.ok) {
          localStorage.setItem('userObject', JSON.stringify(userData))
          console.log('token good')
        } else {
          setUserToken(null)
          localStorage.setItem('token', '')
          console.log('token invalid')
        }
      } catch (err) {
        setUserToken(null)
        localStorage.setItem('token', '')
        console.error(err)
      }
    }
    tokenVerification()
  }, [])

  return (

  )
}

export default Home