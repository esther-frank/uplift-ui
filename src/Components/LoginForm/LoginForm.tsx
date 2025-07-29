import * as bootstrap from 'react-bootstrap'
import { useState } from 'react'
import styles from './LoginForm.module.scss'

interface LoginFormProps {
  handleClick: () => void
}

const LoginForm = ({ handleClick }: LoginFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Add authentication logic here
    // pass username and password to the api for validation
    console.log('Logging in with:')
    console.log('Username:', username)
    console.log('Password:', password)
    // if successful
    handleClick()
    // else show error message
    // e.g., setError('Invalid username or password')
  }

  const handleCreateAccount = () => {
    // pass username and password from state to the api for account creation
    console.log('Creating account for:', username)
    console.log('With password:', password)
    // if successful
    handleClick()
    // else show error message
    // e.g., setError('Account creation failed')
  }

  return (
    <bootstrap.Form
      className={styles.loginForm}
      onSubmit={(e) => {
        handleSubmit(e)
      }}
    >
      <bootstrap.Form.Group controlId="formBasicUsername">
        <bootstrap.Form.Label>Username</bootstrap.Form.Label>
        <bootstrap.Form.Control
          type="text"
          className={styles.formField}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
      </bootstrap.Form.Group>

      <bootstrap.Form.Group controlId="formBasicPassword">
        <bootstrap.Form.Label>Password</bootstrap.Form.Label>
        <bootstrap.Form.Control
          type="password"
          className={styles.formField}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </bootstrap.Form.Group>

      <div className={styles.buttonGroup}>
        <bootstrap.Button
          variant="secondary"
          type="button"
          className={styles.createButton}
          onClick={handleCreateAccount}
        >
          Create Account
        </bootstrap.Button>
        <bootstrap.Button
          variant="primary"
          type="submit"
          className={styles.submitButton}
        >
          Log In
        </bootstrap.Button>
      </div>
    </bootstrap.Form>
  )
}

export default LoginForm
