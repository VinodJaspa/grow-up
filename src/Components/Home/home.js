import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  styled,
} from '@mui/material';
// import TaskForm from './TaskForm';
import TaskForm from "../TaskForm/taskForm"
import { useDispatch } from 'react-redux';
import { setFont } from '../../Redux/store';
import DailyRoutineCard from '../Cards/taskCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@emotion/react';
import CreateActivity from '../CreateActivityAction/createActivityActions';

import FormModal from '../Modal/modal';
import HourlyCard from '../Cards/hourlyCard';
import ToDoForm from '../TodoForm/todoForm';
import TaskCard from '../Cards/taskCard';

const Home = () => {
  console.log('Home is rendering');
  const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
 const [title, setTitle] = useState('')
  const CustomContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    '&.big-container': {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '&.small-container': {
      display: 'block',
      marginTop: theme.spacing(2),
    },
  }));
  //Modal check is open or not
  const [isOpen, setIsOpen] = useState(false);
  const [ContentComponent, setContentComponent] = useState(null);

  const handleClose = () => setIsOpen(false);
  //get Action name
  const getActionName = (action) => {
    switch (action) {
      case 'hourly':
        setTitle('Add your daily routine.');
        return TaskForm;
      // case 'thoughts':
      //   return AddThoughts;
      case 'to-do':
        setTitle('Add your today to do list.');

        return ToDoForm;
      // case 'well-being':
      //   return WellBeing;
      // case 'diet':
      //   return DietMeal;
      // case 'appointments':
      //   return Appointments;
      default:
        return null;
    }
  };
  const handleActionClick = (action) => {
    const Component = getActionName(action);
    setContentComponent(() => Component); 
    setIsOpen(true);
  };

  return (
    <Container>
       {isOpen && ContentComponent && (
        <FormModal
          title={title}
          contentComponent={ContentComponent}
          isOpen={isOpen}
          handleClose={handleClose}
        />
      )}

      <CustomContainer className={isMobile ? 'small-container' : 'big-container'}>
      <HourlyCard/>
        {/* <TaskCard /> */}
        <DailyRoutineCard />
      </CustomContainer>
      <CreateActivity getName={handleActionClick} />
    </Container>


  );
};

export default Home;
