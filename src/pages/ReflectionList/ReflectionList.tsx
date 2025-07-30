import { useNavigate } from 'react-router-dom'
import styles from './ReflectionList.module.scss'
import Emoji1 from '../../Assests/Emoji1.svg'
import Emoji2 from '../../Assests/Emoji2.svg'
import Emoji3 from '../../Assests/Emoji3.svg'
import Emoji4 from '../../Assests/Emoji4.svg'
import Emoji5 from '../../Assests/Emoji5.svg'


interface ReflectionListProps {
  userId: string | null
}

const ReflectionList = ({ userId, setuserId, setShowNavItems }: LoginProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    setuserId(userId)
    navigate('reflection/{reflectionId}')
  }
  const cardData = [
    { name: 'Happy', description: 'Happy', Emoji: Emoji1 },
    { name: 'Sad', description: 'Sad', Emoji: Emoji2 },
    { name: 'Fun', description: 'Fun', Emoji: Emoji3 },
    { name: 'Clap', description: 'Clap', Emoji: Emoji4 },
    { name: 'Jam', description: 'Jam', Emoji: Emoji5 },
    { name: 'Palm', description: 'Palm', Emoji: Emoji1 },
    { name: 'theo', description: 'descript', Emoji: Emoji2 }
  ]
  return (
    <div className={styles.loginContainer}>
      <h1>Reflection List</h1>
      <p onClick={handleClick}>reflection</p>
      <div className={styles.ListSection}>
          <h1 className={styles.ListTitle}>Reflection List</h1>
          <div className={styles.List}>
            <div>
              <h1 className={styles.ListHeading1}>Reflection</h1>
              {cardData.map((card, index) => (
                <div key={index} className={styles.ListContent}>
                  <h3>{card.name}</h3>
                </div>
              ))}
            </div>
            <div>
              <h1 className={styles.ListHeading2}>Content</h1>
              {cardData.map((card, index) => (
                <div key={index} className={styles.ListContent}>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
            <div>
              <h1 className={styles.ListHeading3}>Emoji</h1>
              {cardData.map((card, index) => (
                <div key={index} className={styles.ListContent}>
                  <img src={card.Emoji} alt='emoji' />
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default ReflectionList
