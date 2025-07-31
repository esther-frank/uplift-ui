import ChartSection from '../../Components/ChartSection/ChartSection'
import QuoteCarousel from '../../Components/QuoteCarousel/QuoteCarousel'
import styles from './Home.module.scss'
import useVerification from '../../Hooks/useVerification'
import { useNavigate } from 'react-router-dom'

interface homeProps {
  userToken: string | null
  setUserToken: (userToken: string | null) => void
}
const Home = ({ userToken, setUserToken }: homeProps) => {
  const navigate = useNavigate()

  const isLoggedIn = useVerification({ userToken, setUserToken })
  if (!isLoggedIn) {
    navigate('/')
  }

  return (
    <div className={styles.pageContent}>
      <main className={styles.homepageLayout}>
        <div className={styles.WelcomeSection}>
          <h2 className={styles.Title}>What is Uplift?</h2>
          <h3 className={styles.subtitle}>hi{userToken}</h3>
        </div>

        <div className={styles.reviewsSection}>
          <h2 className={styles.reviewsTitle}>Reviews</h2>
          <p>***** Best website I've ever seen!</p>
        </div>

        <div className={styles.carouselSection}>
          <QuoteCarousel />
        </div>

        <div className={styles.chartSection}>
          <ChartSection />
        </div>

      </main>
    </div>
  )
}

export default Home
