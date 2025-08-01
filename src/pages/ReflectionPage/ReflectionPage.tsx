import { Button } from 'react-bootstrap'
import styles from './ReflectionPage.module.scss'
import { useNavigate } from 'react-router-dom'

const ReflectionPage = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/pages/reflectionList')
  }

  return (
    <div className={styles.underConstruction}>
      <p>This page is under construction.</p>
      <p>Check back soon to view this reflection in more detail.</p>
      <Button className={styles.backButton} onClick={handleClick}>Back to reflection list</Button>
    </div>
  )
}

export default ReflectionPage
