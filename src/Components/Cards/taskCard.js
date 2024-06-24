import { Box, Snackbar, Button, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { queryTasksFromFirestore, queryTodoFromFirestore } from '../../Firebase/firestoreUtils';
import './hourlyCard.css';
import Slider from '../../Slider/taskSwipeToRemove';
import TodoSwipetoRemoveSlider from '../../Slider/todoSlider';

const TaskCard = () => {
  const [todoList, setTodoTask] = useState([]);
  const [deletedTodo, setDeletedTodo] = useState(null)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();

  // Fetch today's tasks from Firestore
  const getTodayTodoList = async () => {
    const date = new Date();
    const timezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const localDate = new Date(date.getTime() - timezoneOffset);
    const formattedDate = localDate.toISOString().split('T')[0];
    const task = await dispatch(queryTodoFromFirestore({ date: formattedDate }));
    if (task.payload) {
      setTodoTask(task.payload);
    }
  };

  useEffect(() => {
    getTodayTodoList();
  }, []);

  const handleDone = () => {
    console.log('Task marked as done');
  };

  const handleDelete = (id, index) => {
    const taskToDelete = todoList[index];
    setDeletedTodo({ task: taskToDelete, index });
    setTodoTask(todoList.filter((_, i) => i !== index));
    setOpenSnackbar(true);
  };

  const handleUndo = () => {
    if (deletedTodo) {
      const updatedTasks = [...todoList];
      updatedTasks.splice(deletedTodo.index, 0, deletedTodo.task);
      setTodoTask(updatedTasks);
      setDeletedTodo(null);
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
          {`To do list.`}
        </Typography>
      </Box>

      <TodoSwipetoRemoveSlider data={todoList} handleDone={handleDone} handleDelete={handleDelete} />
      {deletedTodo &&
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Todo list removed"
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

export default TaskCard;
