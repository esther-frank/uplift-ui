import { useEffect, useState } from "react";
import styles from "./QuoteCarousel.module.scss";
import Emoji1 from '../../Assests/Emoji1.svg'
import Emoji2 from '../../Assests/Emoji2.svg'
import Emoji3 from '../../Assests/Emoji3.svg'
import Emoji4 from '../../Assests/Emoji4.svg'
import Emoji5 from '../../Assests/Emoji5.svg'

export default function QuoteCarousel() {
  const [startIndex, setStartIndex] = useState(0);

  const cardData = [
    { name: "Happy", description: "Happy", Emoji: Emoji1},
    { name: "Sad", description: "Sad", Emoji: Emoji2 },
    { name: "Fun", description: "Fun", Emoji: Emoji3 },
    { name: "Clap", description: "Clap", Emoji: Emoji4 },
    { name: "Jam", description: "Jam", Emoji: Emoji5 },
    { name: "Palm", description: "Palm", Emoji: Emoji1 },
    { name:"theo", description:"descript", Emoji: Emoji2 }
  ];

  const visibleCount = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [cardData.length]);

  const visibleCards = Array.from({ length: visibleCount }, (_, i) => {
    return cardData[(startIndex + i) % cardData.length];
  });

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.cardContainer}>
        {visibleCards.map((card, index) => (
          <div
            key={index}
            className={`${styles.quoteCard} ${index === 1 ? styles.activeCard : ''}`}
          >
            <h3>{card.name}</h3>
            <p>{card.description}</p>
            <img src={card.Emoji} alt='emoji'/>
          </div>
        ))}
      </div>
    </div>
  );
}
