import styles from './Login.module.scss'

import LoginForm from '../../Components/LoginForm/LoginForm'

interface LoginProps {
  setUserToken: (userToken: string | null) => void
}

const Login = ({ setUserToken }: LoginProps) => {
  return (
    <div className={styles.loginContainer}>
      <h1>Log In</h1>
      <LoginForm
        setUserToken={setUserToken}
      />
    </div>
  )
}

export default Login
