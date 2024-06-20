// src/Components/Challenges/MinimalismGame.js
import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const MinimalismGame = () => {
  const tasks = [
    "Get rid of 1 item on Day 1",
    "Get rid of 2 items on Day 2",
    "Continue increasing the number of items daily",
    // Add more tasks as needed
  ];

  return (
    <div>
      <h3>30 Day Minimalism Game</h3>
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

export default MinimalismGame;
