import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import useVerification from '../../Hooks/useVerification'
import useGetBadges from '../../Hooks/useGetBadges'
import styles from './Reflection.module.scss'
import Emoji1 from '../../Assests/Emoji1.svg'
import Emoji2 from '../../Assests/Emoji2.svg'
import Emoji3 from '../../Assests/Emoji3.svg'
import Emoji4 from '../../Assests/Emoji4.svg'
import Emoji5 from '../../Assests/Emoji5.svg'
import badge1 from '../../Assests/badge1.svg'
import badge2 from '../../Assests/badge2.svg'
import badge3 from '../../Assests/badge3.svg'
import badge4 from '../../Assests/badge4.svg'
import badge5 from '../../Assests/badge5.svg'
import badge6 from '../../Assests/badge6.svg'
import badge7 from '../../Assests/badge7.svg'
import useSaveReflection from '../../Hooks/useSaveReflection'

const MOODS = [Emoji1, Emoji2, Emoji3, Emoji4, Emoji5]

interface reflectionProps {
  userId: string | null
  userToken: string | null
  setUserToken: (userToken: string | null) => void
}

type BadgeData = {
    badgeId: number;
    badgeTitle: string; 
    badgeImage: string;
}
const Reflection = ({ userId, userToken, setUserToken }: reflectionProps) => {
  const [reflectionTitle, setReflectionTitle] = useState<string>('')
  const [reflection, setReflection] = useState<string>('')
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [sliderValue, setSliderValue] = useState(1)

  const navigate = useNavigate()
  const { saveReflection, error: saveError, isLoading } = useSaveReflection({ userToken })
    const { badges , error} = useGetBadges({ userId, userToken })


  const isFormValid = reflection.trim() && selectedMood

  const isLoggedIn = useVerification({ userToken, setUserToken })
  if (!isLoggedIn) {
    navigate('/')
  }

  if (error) {
    return (
      <div className={styles.error}>
        Couldn't fetch reflections, please try again later.
      </div>
    )
  }

  const badgeData: BadgeData[] = badges.map((badge) => ({
  badgeId: badge.badgeId,
  badgeTitle: badge.badgeTitle,
  badgeImage: badge.badgeImage,
}))

const badgeMap: Record<string, string> = {
  badge1,
  badge2,
  badge3,
  badge4,
  badge5,
  badge6,
  badge7,
}
 console.log(badgeData)

const badgeElements = badgeData.map((badge, index) => {
  const badgeSrc = badgeMap[badge.badgeImage];
  if (!badgeSrc) return null;
  return (
    <img
      key={index}
      src={badgeSrc}
      alt={badge.badgeTitle}
      className={styles.streakFlameImage}
    />
  )
})

  const handleSave = async () => {
    if (!isFormValid) {
      alert('Please fill in both your reflection and mood before saving.')
      return
    }

    // Call the hook function to send the data to the backend
    const success = await saveReflection({
      userId: userId || '',
      reflectionTitle: reflectionTitle || 'Untitled Reflection',
      reflectionText: reflection,
      confidenceRating: sliderValue,
      emoji: selectedMood,
      image_attachment: null
    })

    if (success) {
      setReflection('')
      setReflectionTitle('')
      setSelectedMood(null)
      setSliderValue(1)
    } else {
      alert(saveError || 'Failed to save reflection, please try again later.')
    }
  }

  const handleCancel = () => {
    setReflection('')
    setReflectionTitle('')
    setSelectedMood(null)
    setSliderValue(1)
  }

  return (
    <div className={styles.pageContent}>
      <div className={styles.reflectionPage}>
        {/* Title Section */}
        <div className={styles.reflectionTitleSection}>
          <h2 className={styles.Title}>Reflection</h2>
          <h2 className={styles.titleAccent}>
            Take a moment to reflect on your learning journey.
          </h2>
        </div>

        {/* Mood Selector */}
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

        {/* Slider */}
        <div className={styles.sliderSection}>
          <label htmlFor="progressSlider">
            How confident are you feeling? <strong>{sliderValue}</strong>
          </label>
          <Form.Range
            id="progressSlider"
            min={1}
            max={10}
            step={1}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className={styles.slider}
          />
        </div>

        {/* Reflection Textarea */}
        <div className={styles.reflectionSection}>
          <h3>Your Reflection</h3>
          <div className={styles.reflectionTitle}>
            <h4>Reflection Title</h4>
            <div>
              <input
                required
                value={reflectionTitle}
                onChange={(e) => setReflectionTitle(e.target.value)}
                placeholder="Today Was ..."
                className={styles.reflectionTitleTextBox}
              ></input>
            </div>
          </div>
          <textarea
            required
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

        {/* Progress Section */}
        <div className={styles.progressSection}>
          <h5>Earned Badges</h5>
        
          <div className={styles.progressBadges}>
             <span className={styles.progressBadge}>7-Day Streak</span>
            <span className={styles.progressBadge}>Reflection Pro</span>
            <div className={styles.streakFlames}>{badgeElements}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            type="button"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Reflection'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleCancel}
            type="button"
            disabled={isLoading}
          >
            Clear Form
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reflection
