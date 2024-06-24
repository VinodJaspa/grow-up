import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { addTasksToFirestore } from '../../Firebase/firestoreUtils';
import { useDispatch, useSelector } from 'react-redux';

const TaskForm = ({handleClose}) => {
  const [taskName, setTaskName] = useState('');
  const [taskTime, setTaskTime] = useState(dayjs());
  
  const [day, setDay] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [repeatDays, setRepeatDays] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (taskName && taskTime && day) {
      const tasks = [];
      const currentDate = dayjs().add(day - 1, 'day'); // Start from the specified day
      for (let i = 0; i < (repeat ? repeatDays : 1); i++) {
        tasks.push({
          day: currentDate.add(i, 'day').format('YYYY-MM-DD'),
          taskName,
          taskTime: taskTime.format('hh:mm:A'),
          completed: false,
        });
      }
      dispatch(addTasksToFirestore(tasks));
      setTaskName('');
      setTaskTime(dayjs());
      setRepeat(false);
      setRepeatDays(1);
    }

  };



  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              fullWidth
              id="taskName"
              label="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Grid>


          <Grid item xs={12} sm={6}>
            <MobileTimePicker
              label="Task Time"
              value={taskTime}
              onChange={(newValue) => setTaskTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={repeat}
                  onChange={(e) => setRepeat(e.target.checked)}
                  color="primary"
                />
              }
              label="Repeat"
            />
          </Grid>
          {repeat && (
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="repeatDays"
                label="Number of Days to Repeat"
                type="number"
                value={repeatDays}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value < 1) {
                    setRepeatDays(1);
                  } else {
                    setRepeatDays(value);
                  }
                }}
                inputProps={{ min: 1 }}
              />
            </Grid>
          )}
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Add
        </Button>
      </LocalizationProvider>

    </Box>

  );
};

export default TaskForm;
