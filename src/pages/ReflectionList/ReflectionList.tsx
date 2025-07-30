import { useNavigate } from 'react-router-dom'
import styles from './ReflectionList.module.scss'
import Emoji1 from '../../Assests/Emoji1.svg'
import Emoji2 from '../../Assests/Emoji2.svg'
import Emoji3 from '../../Assests/Emoji3.svg'
import Emoji4 from '../../Assests/Emoji4.svg'
import Emoji5 from '../../Assests/Emoji5.svg'


const ReflectionList = ({ userId, setuserId, setShowNavItems }: LoginProps) => {
  const navigate = useNavigate()

  const handleClick = (card) => {
    navigate(`reflection/${card.reflectionId}`)
  }

  const cardData = [
    { name: 'Today went well', description: 'Happy', Emoji: Emoji1 , reflectionId: 123 },
    { name: 'Today went ok', description: 'Sad', Emoji: Emoji2 , reflectionId: 123},
    { name: 'Today went alright', description: 'Fun', Emoji: Emoji3 , reflectionId: 123},
    { name: 'Today went badly', description: 'Clap', Emoji: Emoji4 , reflectionId: 123},
    { name: 'Today went ok', description: 'Jam', Emoji: Emoji5 , reflectionId: 123},
    { name: 'Today went meh', description: 'Palm', Emoji: Emoji1 , reflectionId: 123},
    { name: 'Today went poor', description: 'descript', Emoji: Emoji2 , reflectionId: 123}
  ]

  return (
    <div className={styles.loginContainer}>

      <div className={styles.ListSection}>
        <h1 className={styles.ListTitle}>Reflection List</h1>

        <div className={styles.List}>
          <div className={styles.ListRowHeader}>
            <div className={styles.ListHeading}>Reflection</div>
            <div className={styles.ListHeading}>Content</div>
            <div className={styles.ListHeading}>Emoji</div>
          </div>

          {cardData.map((card, index) => (
            <div key={index} className={styles.ListRow} onClick={handleClick} title={card.name}>
              <div className={styles.ListContent}>{card.name}</div>
              <div className={styles.ListContent}>{card.description}</div>
              <div className={styles.ListContent}>
                <img src={card.Emoji} alt="emoji" className={styles.Emoji} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReflectionList
