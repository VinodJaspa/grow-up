import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMood } from '../../Redux/store';
import './moodtracker.css';

function MoodTracker() {
  const moodData = useSelector((state) => state.mood);
  const dispatch = useDispatch();
  const [selectedMoods, setSelectedMoods] = useState(new Array(moodData.length).fill(false));

  const handleMoodChange = (dayIndex, event) => {
    dispatch(setMood({ dayIndex, mood: event.target.value }));
    setSelectedMoods((prevSelectedMoods) => {
      const newSelectedMoods = [...prevSelectedMoods];
      newSelectedMoods[dayIndex] = true;
      return newSelectedMoods;
    });
  };

  return (
    <div className="mood-tracker">
      <h2>Mood Tracker</h2>
      {moodData.map((mood, index) => (
        <div key={index} className="mood-tracker-item card">
          <label>Date: {new Date().toDateString()}</label>
          {!selectedMoods[index] ? (
            <select value={mood} onChange={(e) => handleMoodChange(index, e)}>
              <option value="">Select Mood</option>
              <option value="happy">Happy</option>
              <option value="neutral">Neutral</option>
              <option value="sad">Sad</option>
            </select>
          ) : (
            <p>Mood selected: {mood}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MoodTracker;
