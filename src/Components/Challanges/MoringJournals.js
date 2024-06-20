// src/Components/Challenges/MorningPages.js
import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const MorningPages = () => {
  const tasks = [
    "Write 3 pages of stream-of-consciousness writing each morning",
    "Make it a daily habit to write as soon as you wake up",
    "Reflect on your thoughts and emotions",
    // Add more tasks as needed
  ];

  return (
    <div>
      <h3>Morning Pages Challenge</h3>
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

export default MorningPages;
