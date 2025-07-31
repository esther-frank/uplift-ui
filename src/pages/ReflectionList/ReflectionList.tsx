import { useNavigate } from 'react-router-dom'
import styles from './ReflectionList.module.scss'
import useReflectionsList from '../../Hooks/useReflectionsList'

interface reflectionListProps {
  userId: string | null
  userToken: string | null
}

type CardData = {
  title: string
  description: string
  emoji: string
  confidenceRating: number
  reflectionId: number
}

const ReflectionList = ({ userId, userToken }: reflectionListProps) => {
  const navigate = useNavigate()
  const { reflections, error } = useReflectionsList({ userId, userToken })

  const handleClick = (reflectionId: number) => {
    navigate(`reflection/${reflectionId}`)
  }

  const cardData: CardData[] = reflections.map((reflection) => ({
    title: reflection.reflectionTitle,
    description: reflection.reflectionText,
    emoji: reflection.emoji || '',
    confidenceRating: reflection.confidenceRating,
    reflectionId: reflection.reflectionId
  })).reverse()

  if (error) {
    return (
      <div className={styles.error}>
        Couldn't fetch reflections, please try again later.
      </div>
    )
  }

  return (
    <div className={styles.pageContent}>
      <div className={styles.ListSection}>
        <h1 className={styles.ListTitle}>Reflection List</h1>

        <div className={styles.List}>
          <div className={styles.ListRowHeader}>
            <div className={styles.ListHeading}>Reflection</div>
            <div className={styles.ListHeading}>Content</div>
            <div className={styles.ListHeading}>Emoji</div>
            <div className={styles.ListHeading}>Confidence rating</div>
          </div>

          {cardData.map((card, index) => (
            <div
              key={index}
              className={styles.ListRow}
              onClick={() => handleClick(card.reflectionId)}
              title={card.title}
            >
              <div className={styles.ListContent}>{card.title}</div>
              <div className={styles.ListContent}>{card.description}</div>
              <div className={styles.ListContent}>
                <img src={card.emoji} alt="emoji" className={styles.Emoji} />
              </div>
              <div className={styles.ListContent}>{card.confidenceRating}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReflectionList
