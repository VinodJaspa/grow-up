import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button } from '@mui/material';

const NoComplaintChallenge = () => {
  const [challengeCreated, setChallengeCreated] = useState(false);

  const tasks = [
    "Avoid complaining for the entire day",
    "Practice gratitude instead of complaining",
    "Reflect on any slip-ups and learn from them",
    // Add more tasks as needed
  ];

  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() + 1); // Start from tomorrow
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 21); // End after 21 days

  const handleCreateNewChallenge = () => {
    // Implement logic to create a new challenge
    setChallengeCreated(true);
    console.log("New challenge created!");
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Challenge Days</TableCell>
            {tasks.map((task, index) => (
              <TableCell key={index} align="center">
                {task}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {generateDays(startDate, endDate).map((day, dayIndex) => (
            <TableRow key={dayIndex}>
              <TableCell>{day.toDateString()}</TableCell>
              {tasks.map((task, taskIndex) => (
                <TableCell key={taskIndex} align="center">
                  <Checkbox disabled={!challengeCreated} />
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              {!challengeCreated && (
                <Button variant="contained" color="primary" onClick={handleCreateNewChallenge}>
                  Create New Challenge
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Function to generate an array of dates from start date to end date
const generateDays = (startDate, endDate) => {
  const days = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }
  return days;
};

export default NoComplaintChallenge;
