import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReflectionPage.css';

const MOODS = ['😊', '😐', '😞'] as const;

interface ReflectionData {
  reflection: string;
  selectedMood: string | null;
}

const ReflectionPage: React.FC = () => {
  const [reflection, setReflection] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSave = (): void => {
    if (!reflection.trim() || !selectedMood) {
      alert('Please fill in both your reflection and mood before saving.');
      return;
    }
    
    const reflectionData: ReflectionData = { reflection, selectedMood };
    console.log('Saved reflection:', reflectionData);
    // TODO: Add API call or local storage logic
  };

  const handleCancel = (): void => {
    setReflection('');
    setSelectedMood(null);
  };

  const handleMoodSelect = (mood: string): void => {
    setSelectedMood(mood);
  };

  const handleReflectionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setReflection(event.target.value);
  };

  return (
    <div className="reflection-page">
      <div className="container mt-5">
        <div className="bg-warning p-4 text-center rounded">
          <h2>Reflection</h2>
          <p className="mb-0">Take a moment to reflect on your learning journey.</p>
        </div>

        {/* Mood Selector */}
        <div className="mt-4">
          <h5>How are you feeling today?</h5>
          <div className="d-flex gap-3 mood-selector">
            {MOODS.map((mood) => (
              <button
                key={mood}
                className={`btn btn-light fs-3 mood-button ${selectedMood === mood ? 'selected' : ''}`}
                onClick={() => handleMoodSelect(mood)}
                type="button"
                aria-label={`Select mood: ${mood}`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Reflection Text Area */}
        <div className="mt-4">
          <label htmlFor="reflectionText" className="form-label">
            Your Reflection
          </label>
          <textarea
            id="reflectionText"
            className="form-control reflection-textarea"
            rows={6}
            placeholder="Write your thoughts here..."
            value={reflection}
            onChange={handleReflectionChange}
            aria-describedby="reflectionHelp"
          />
          <div id="reflectionHelp" className="form-text">
            Share your thoughts about your learning journey today.
          </div>
        </div>

        {/* Progress Badges */}
        <div className="mt-4">
          <h5>Your Progress</h5>
          <div className="d-flex gap-3">
            <span className="badge bg-success progress-badge">7-Day Streak</span>
            <span className="badge bg-info progress-badge">Reflection Pro</span>
          </div>
        </div>        {/* Action Buttons */}
        <div className="mt-4 d-flex gap-2 action-buttons">
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
            type="button"
            disabled={!reflection.trim() || !selectedMood}
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
  );
};export default ReflectionPage;
