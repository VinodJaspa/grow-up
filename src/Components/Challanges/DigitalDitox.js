// src/Components/Challenges/DigitalDetox.js
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button } from '@mui/material';

const DigitalDetox = () => {
  const tasks = [
    "Take a break from screens and digital devices",
    "Engage in offline activities (reading, hobbies, etc.)",
    "Reflect on your digital habits",
    // Add more tasks as needed
  ];

  const [challengeCreated, setChallengeCreated] = useState(false);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const getSaturdaysOfMonth = (year, month) => {
    const saturdays = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === 6 && d.getMonth() === month) {
        saturdays.push(new Date(d));
      }
    }
    return saturdays;
  };

  const saturdays = getSaturdaysOfMonth(currentYear, currentMonth);

  const handleCreateNewDetox = () => {
    // Implement your logic to create a new detox challenge
    setChallengeCreated(true);
    // For example: you can set state or perform any necessary actions
    console.log("New detox challenge created!");
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month's Saturdays</TableCell>
            {tasks.map((task, index) => (
              <TableCell key={index} align="center">
                {task}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {saturdays.map((saturday, index) => (
            <TableRow key={index}>
              <TableCell>{saturday.toDateString()}</TableCell>
              {tasks.map((task, taskIndex) => (
                <TableCell key={taskIndex} align="center">
                  <Checkbox />
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              {currentMonth === new Date().getMonth() && !challengeCreated && (
                <Button variant="contained" color="primary" onClick={handleCreateNewDetox}>
                  Create New Detox
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DigitalDetox;
