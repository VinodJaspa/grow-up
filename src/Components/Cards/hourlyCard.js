import { Box, Snackbar, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { queryTasksFromFirestore } from '../../Firebase/firestoreUtils';
import './hourlyCard.css';
import TaskSwipetoRemoveSlider from '../../Slider/taskSwipeToRemove';


const HourlyCard = () => {
    const [todayHourlyTask, setTodayHourlyTask] = useState([]);
    const [deletedTask, setDeletedTask] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useDispatch();
    // Fetch today's tasks from Firestore
    const getTodayTaskList = async () => {
        const date = new Date();
        const timezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
        const localDate = new Date(date.getTime() - timezoneOffset);
        const formattedDate = localDate.toISOString().split('T')[0];
        const task = await dispatch(queryTasksFromFirestore({ date: formattedDate }));
        if (task.payload) {
            setTodayHourlyTask(task.payload);
        }
    };

    useEffect(() => {
        getTodayTaskList();
    }, []);

    const handleDone = () => {
        console.log('Task marked as done');
    };

    const handleDelete = (id ,index) => {
        const taskToDelete = todayHourlyTask[index];
        setDeletedTask({ task: taskToDelete, index });
        setTodayHourlyTask(todayHourlyTask.filter((_, i) => i !== index));
        setOpenSnackbar(true);
    };

    const handleUndo = () => {
        if (deletedTask) {
            const updatedTasks = [...todayHourlyTask];
            updatedTasks.splice(deletedTask.index, 0, deletedTask.task);
            setTodayHourlyTask(updatedTasks);
            setDeletedTask(null);
        }
        setOpenSnackbar(false);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
 
    
    return (
        <div className='page-view'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                <Typography variant="h6" className="time-text">
                    {`Hourly Routine`}
                </Typography>
            </Box>

            <TaskSwipetoRemoveSlider data={todayHourlyTask} handleDone={handleDone} handleDelete={handleDelete}/>
            {deletedTask &&  openSnackbar &&
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Task deleted"
                action={
                    <>
                        <Button color="inherit" size="small" onClick={handleUndo}>
                            UNDO
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleCloseSnackbar}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            />
}

        </div>
    );
};

export default HourlyCard;
