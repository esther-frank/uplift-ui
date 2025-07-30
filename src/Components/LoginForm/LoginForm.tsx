import * as bootstrap from 'react-bootstrap'
import { useState } from 'react'
import styles from './LoginForm.module.scss'

interface LoginFormProps {
  handleClick: () => void
}

const LoginForm = ({ handleClick }: LoginFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await fetch('http://185.150.1.9:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      const token = await response.text()

      if (response.ok && !token.toLowerCase().includes('invalid')) {
        localStorage.setItem('token', token)

        handleClick()
      } else {
        console.log("incorrect")
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleCreateAccount = async () => {
  try {
    const response = await fetch('http://185.150.1.9:8081/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    const token = await response.text()

    if (response.ok && !token.toLowerCase().includes('exists')) {
      localStorage.setItem('token', token)

      handleClick()
    } else {
      console.log("Username already exists")
    }
  } catch (err) {
    console.error(err)
  }
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
