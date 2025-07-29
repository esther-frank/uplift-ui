import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'

import LoginForm from '../../Components/LoginForm/LoginForm'

interface LoginProps {
  userId: string | null
  setuserId: (userId: string | null) => void
  setShowNavItems: (show: boolean) => void
}

const Login = ({ userId, setuserId, setShowNavItems }: LoginProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    setuserId(userId)
    // add auth logic that if auth is success, set to true
    setShowNavItems(true)
    navigate('/pages/home')
  }
  return (
    <div className={styles.loginContainer}>
      <h1>Log In</h1>
      <LoginForm handleClick={handleClick} />
    </div>
  )
}

export default Login
