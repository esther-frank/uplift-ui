import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Reflection.module.scss'
import Emoji1 from '../../Assests/Emoji1.svg'
import Emoji2 from '../../Assests/Emoji2.svg'
import Emoji3 from '../../Assests/Emoji3.svg'
import Emoji4 from '../../Assests/Emoji4.svg'
import Emoji5 from '../../Assests/Emoji5.svg'

const MOODS = [Emoji1, Emoji2, Emoji3, Emoji4, Emoji5]

const Reflection = () => {
  const [reflection, setReflection] = useState<string>('')
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const isFormValid = reflection.trim() && selectedMood

  const handleSave = () => {
    if (!isFormValid) {
      alert('Please fill in both your reflection and mood before saving.')
      return
    }

    console.log('Saved reflection:', { reflection, selectedMood })
    // TODO: Add API call or local storage logic
  }

  const handleCancel = () => {
    setReflection('')
    setSelectedMood(null)
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
        {/* Mood Selector */}
        <div className={styles.moodSection}>
          <h5>How are you feeling today?</h5>
          <div className={styles.moodSelections}>
            {MOODS.map((mood, index) => (
              <img key={index} aria-label={`Select mood: ${mood}`}>
                {mood}
              </img>
            ))}
          </div>
        </div>
        {/* Reflection Text Area */}
        <div className={styles.reflectionSection}>
          <label htmlFor="reflectionText" className="form-label">
            Your Reflection
          </label>
          <textarea
            id="reflectionText"
            className="form-control reflection-textarea"
            rows={6}
            placeholder="Write your thoughts here..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            aria-describedby="reflectionHelp"
          />
          <div id="reflectionHelp" className="form-text">
            Share your thoughts about your learning journey today.
          </div>
        </div>
        <div className="mt-4">
          <h5>Your Progress</h5>
          <div className="d-flex gap-3">
            <span className="badge bg-success progress-badge">
              7-Day Streak
            </span>
            <span className="badge bg-info progress-badge">Reflection Pro</span>
          </div>
        </div>{' '}
        {/* Action Buttons */}
        <div className="mt-4 d-flex gap-2 actionButtons">
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
