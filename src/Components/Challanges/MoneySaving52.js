// src/Components/Challenges/MoneySavingChallenge.js
import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const MoneySavingChallenge = () => {
  const weeks = [...Array(52).keys()].map(week => week + 1);
  const tasks = weeks.map(week => `Save $${week * 100} this week`);

  return (
    <div>
      <h3>52 Week Money Saving Challenge</h3>
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

export default MoneySavingChallenge;
