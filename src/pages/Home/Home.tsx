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
    return null
  }

  return (
    <div className={styles.pageContent}>
      <main className={styles.homepageLayout}>
        <div className={styles.WelcomeSection}>
          <h1 className={styles.Title}>What is Uplift?</h1>
          <p className={styles.subtitle}>
            UpLift is a web-based confidence tracker, designed by apprentices
            for apprentices, built to support personal growth and combat
            imposter syndrome. It provides a simple, structured space to log
            reflections, celebrate milestones and track your progress over time.
            UpLift helps you recognize how far you’ve come with motivational
            prompts and growth timelines. Turning everyday achievements into
            lasting confidence to ensure apprentices feel supported and
            confident for what’s next.{' '}
          </p>
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
