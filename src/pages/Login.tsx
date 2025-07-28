interface LoginProps {
  userId: string | null
  setuserId: (userId: string | null) => void
}

const Login = ({ userId, setuserId }: LoginProps) => {
  const handleClick = () => {
    setuserId(userId)
  }
  return (
    <div>
      <a href="/pages/reflections">Log in</a>
      <a href="/pages/home">Go to Home</a>
      <button onClick={handleClick}>click me</button>
    </div>
  )
}

export default Login
