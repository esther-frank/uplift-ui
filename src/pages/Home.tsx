interface homeProps {
  userId: string | null
}
const Home = ({ userId }: homeProps) => {
  const user = userId
  return (
    <div>
      <a href="/pages/reflections">{user}</a>
    </div>
  )
}

export default Home
