// src/Components/Challenges/SeventyFiveHard.js
import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const SeventyFiveHard = () => {
  const tasks = [
    "Read 10 pages of a non-fiction book",
    "Follow a strict diet plan",
    "Drink a gallon of water",
    "Take progress pictures",
    "Exercise for 45 minutes",
    // Add more tasks as needed
  ];

  return (
    <div>
      <h3>75 Hard Challenge</h3>
      {tasks.map((task, index) => (
        <FormControlLabel
          key={index}
          control={<Checkbox />}
          label={task}
        />
      ))}
    </div>
  );
};

export default SeventyFiveHard;
