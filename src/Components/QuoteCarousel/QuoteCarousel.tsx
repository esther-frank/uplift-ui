import { useEffect, useState } from 'react'
import useGetMessages from '../../Hooks/useGetMessages'
import styles from './QuoteCarousel.module.scss'

export default function QuoteCarousel() {
  const [startIndex, setStartIndex] = useState(0)

  const { messages, error } = useGetMessages()

  const cardData = messages.map((message) => ({
    messageText: message.messageText,
    messageAuthor: message.messageAuthor
  }))

  const visibleCount = 3

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % cardData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [cardData.length])

  if (error) {
    return <div className={styles.errorMessage}>There was an error fetching messages, please try again later.</div>
  }

  if (cardData.length === 0) {
    return <div className={styles.noMessages}>No messages available</div>
  }

  const visibleCards = Array.from({ length: visibleCount }, (_, i) => {
    return cardData[(startIndex + i) % cardData.length]
  })

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.cardContainer}>
        {visibleCards.map((card, index) => (
          <div
            key={index}
            className={`${styles.quoteCard} ${index === 1 ? styles.activeCard : ''}`}
          >
            <h3>{card.messageText}</h3>
            <p>{card.messageAuthor}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
