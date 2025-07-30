import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useVerification from '../../Hooks/useVerification'
import styles from './Reflection.module.scss'
import Emoji1 from '../../Assests/Emoji1.svg'
import Emoji2 from '../../Assests/Emoji2.svg'
import Emoji3 from '../../Assests/Emoji3.svg'
import Emoji4 from '../../Assests/Emoji4.svg'
import Emoji5 from '../../Assests/Emoji5.svg'
import StreakFlame from '../../Assests/StreakFlame.svg'

const MOODS = [Emoji1, Emoji2, Emoji3, Emoji4, Emoji5]

interface reflectionProps {
  userToken: string | null
  setUserToken: (userToken: string | null) => void
}
const Reflection = ({ userToken, setUserToken }: reflectionProps) => {
  const [reflection, setReflection] = useState<string>('')
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [sliderValue, setSliderValue] = useState(1) // Slider value from 1 to 10

  const navigate = useNavigate()

  const isFormValid = reflection.trim() && selectedMood

  const isLoggedIn = useVerification({ userToken, setUserToken })
  if (!isLoggedIn) {
    navigate('/')
  }

  const DaysOfStreak = 5;

const streak = Array.from({ length: DaysOfStreak }, (_, i) => (
  <img key={i} src={StreakFlame} alt="streak flame"/>
));
  const handleSave = () => {
    if (!isFormValid) {
      alert('Please fill in both your reflection and mood before saving.')
      return
    }
    console.log('Saved reflection:', { reflection, selectedMood, sliderValue })
  }

  const handleCancel = () => {
    setReflection('')
    setSelectedMood(null)
    setSliderValue(1)
  }

  return (
    <div className={styles.pageContent}>
      <div className={styles.reflectionPage}>
        <div className={styles.reflectionTitleSection}>
          <h2 className={styles.Title}>Reflection</h2>
          <h2 className={styles.titleAccent}>
            Take a moment to reflect on your learning journey.
          </h2>
        </div>

        {/* Mood Selector: Row 1, Col 1 */}
        <div className={styles.moodSection}>
          <h5>How are you feeling today?</h5>
          <div className={styles.moodSelections}>
            {MOODS.map((mood, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.moodButton} ${
                  selectedMood === mood ? styles.selected : ''
                }`}
                onClick={() => setSelectedMood(mood)}
              >
                <img src={mood} alt={`Mood ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Slider: Row 1, Col 2 */}
        <div className={styles.sliderSection}>
          <label htmlFor="progressSlider">
            How confident are you feeling <strong>{sliderValue}</strong>
          </label>
          <input
            type="range"
            id="progressSlider"
            min={1}
            max={10}
            step={1}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className={styles.slider}
          />
        </div>

        {/* Reflection Textarea: Row 2, Col 1 & 2 */}
        <div className={styles.reflectionSection}>
          <h3>Your Reflection</h3>
          <textarea
            id="reflectionText"
            className={styles.reflectionTextarea}
            rows={6}
            placeholder="Write your thoughts here..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            aria-describedby="reflectionHelp"
          />
          <div id="reflectionHelp" className={styles.reflectionHelpText}>
            Share your thoughts about your learning journey today.
          </div>
        </div>

        {/* Progress Section: Row 1 & 2, Col 3 */}
        <div className={styles.progressSection}>
          <h5>Your Progress</h5>
          <div className={styles.progressBadges}>
            <span className={styles.progressBadge}>7-Day Streak</span>
            <span className={styles.progressBadge}>Reflection Pro</span>
            <div className={styles.streakFlames}>
               {streak}
            </div>
          </div>
        </div>

        {/* Action Buttons: Row 3, Col 1 to 3 */}
        <div className={`${styles.actionButtons} d-flex`}>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            type="button"
            disabled={!isFormValid}
          >
            Save Reflection
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleCancel}
            type="button"
          >
            Clear Form
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reflection
