import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [day, setDay] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskName && taskTime && day) {
      addTask({ day, taskName, taskTime });
      setTaskName('');
      setTaskTime('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            id="day"
            label="Day"
            type="number"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            inputProps={{ min: 1, max: 30 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            id="taskName"
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            id="taskTime"
            label="Task Time"
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
