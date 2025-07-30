import QuoteCarousel from '../../Components/QuoteCarousel/QuoteCarousel'
import styles from './Home.module.scss'

interface homeProps {
  userToken: string | null
}
const Home = ({ userToken }: homeProps) => {
  

  return (
    <div className={styles.pageContent}>
      <main className={styles.homepageLayout}>

        {/* <div className={styles.WelcomeSection}>
          <h2 className={styles.Title}>Welcome to</h2>
          <h2 className={styles.titleAccent}>UpLift</h2>
          <h3 className={styles.subtitle}>hi{userId}</h3>
        </div>

        <div className={styles.whatIsSection}>
          <h1 className={styles.whatIsTitle}>What is Uplift</h1>
          <p>fun stuff</p>
        </div> */}

        <div className={styles.carouselSection}>
          <QuoteCarousel />
        </div>

      </main>
    </div>
  )
}

export default Home
