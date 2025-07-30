import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'

import LoginForm from '../../Components/LoginForm/LoginForm'

interface LoginProps {
  userToken: string | null
  setUserToken: (userToken: string | null) => void
  setShowNavItems: (show: boolean) => void
}

const Login = ({ userToken, setUserToken, setShowNavItems }: LoginProps) => {
  const navigate = useNavigate()

  if(userToken){
    setShowNavItems(true)
    navigate('/pages/home')
  }

  const handleClick = () => {
    setUserToken(localStorage.getItem('token'))

    if(userToken){
      setShowNavItems(true)
      navigate('/pages/home')
    }
  }
  return (
    <div className={styles.loginContainer}>
      <h1>Log In</h1>
      <LoginForm handleClick={handleClick} />
    </div>
  )
}

export default Login
