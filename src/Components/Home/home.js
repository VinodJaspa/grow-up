import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import TaskForm from '../TaskForm/taskForm';


const Home = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const renderTasksForDay = (day) => {
    return tasks
      .filter((task) => task.day === day)
      .map((task, index) => (
        <Typography key={index}>
          {task.taskTime} - {task.taskName}
        </Typography>
      ));
  };

  return (
    <Container component="main">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Home Page
        </Typography>
        <TaskForm addTask={addTask} />
        <Grid container spacing={2} sx={{ mt: 3 }}>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <Grid item xs={12} sm={6} md={4} key={day}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Day {day}</Typography>
                {renderTasksForDay(day)}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
