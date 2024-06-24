import {
    Box,
    Button,
    Grid,
    TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoToFirestore } from '../../Firebase/firestoreUtils';

const ToDoForm = () => {
    const [todoName, setTodoName] = useState('');
    const [todoTime, setTodoTime] = useState(dayjs());
    const [day, setDay] = useState(1);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (todoName && todoTime && day) {
         const currentDate = dayjs().add(day - 1, 'day'); // Start from the specified day
            let todo = {
                day: currentDate.add(1, 'day').format('YYYY-MM-DD'),
                todoName,
                todoTime: todoTime.format('hh:mm:A'),
                completed: false,
            }
            dispatch(addTodoToFirestore(todo));
            setTodoName('');
            setTodoTime(dayjs());

        }}



return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        fullWidth
                        id="todoName"
                        label="To Do Name"
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                    />
                </Grid>


                <Grid item xs={12} sm={6}>
                    <MobileTimePicker
                        label="Task Time"
                        value={todoTime}
                        onChange={(newValue) => setTodoTime(newValue)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                </Grid>

            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Add
            </Button>
        </LocalizationProvider>

    </Box>

);
};

export default ToDoForm;
