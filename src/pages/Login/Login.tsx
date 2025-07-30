import styles from './Login.module.scss'

import LoginForm from '../../Components/LoginForm/LoginForm'
import { useNavigate } from 'react-router-dom'
import useVerification from '../../Hooks/useVerification'

interface LoginProps {
  userToken: string | null
  setUserToken: (userToken: string | null) => void
}

const Login = ({ userToken, setUserToken }: LoginProps) => {
  const navigate = useNavigate()

  const isLoggedIn = useVerification({ userToken, setUserToken })
  if (isLoggedIn) {
    navigate('/pages/home')
  }

  return (
    <div className={styles.loginContainer}>
      <h1>Log In</h1>
      <LoginForm setUserToken={setUserToken} />
    </div>
  )
}

export default Login
