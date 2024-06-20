import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './tasktable.css';
import { setPlan } from '../../Redux/store';


const PlanTable = () => {
  const plan = useSelector(state => state.plan);

  const dispatch = useDispatch();
  const handleCheckboxChange = (dayIndex, taskIndex) => {
    const newPlan = [...plan];
    newPlan[dayIndex].tasks[taskIndex].completed = !newPlan[dayIndex].tasks[taskIndex].completed;

    dispatch(setPlan(newPlan));


  };


  React.useEffect(() => {


    // Schedule notifications for tasks
    plan.forEach(day => {
      day.tasks.forEach(task => {
        scheduleNotification(day.date, task.time, task.activity);
      });
    });
  }, []);

  const scheduleNotification = (date, time, activity) => {
    const [hours, minutes] = time.split(':');
    const notificationDateTime = new Date(date);
    notificationDateTime.setHours(hours, minutes, 0, 0);

    if (notificationDateTime > new Date()) {
      // Schedule notification
      setTimeout(() => {
        showNotification(activity);
      }, notificationDateTime - new Date());
    }
  };

  const showNotification = (activity) => {
    if (Notification.permission === 'granted') {
      new Notification('Task Reminder', {
        body: `Time for ${activity}`,
        icon: 'path-to-notification-icon.png'
      });
    }
  };

  const isTaskTimePassed = (taskDate, taskTime) => {
    const currentDate = new Date();
    const [taskHours, taskMinutes] = taskTime.split(' ')[0].split(':');
    const taskPeriod = taskTime.split(' ')[1];
    const taskHours24 = taskPeriod === 'PM' && taskHours !== '12' ? parseInt(taskHours) + 12 : parseInt(taskHours);
    const taskDateTime = new Date(taskDate);
    taskDateTime.setHours(taskHours24, taskMinutes, 0, 0);

    return currentDate >= taskDateTime;
  };

  const isFutureDate = (taskDate) => {
    const currentDate = new Date();
    const dateToCompare = new Date(taskDate);
    dateToCompare.setHours(0, 0, 0, 0);
    return dateToCompare > currentDate;
  };

  return (
    <TableContainer component={Paper} className="plan-table-container">
      <Table stickyHeader className="MuiTable-root">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="MuiTableCell-head">Date</TableCell>
            {plan.length > 0 && plan[0].tasks.map((task, index) => (
              <TableCell key={index} className="MuiTableCell-head">
                <div>{task.time}</div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {plan.map((day, dayIndex) => (
            <TableRow key={day.date}>
              <TableCell>{day.date}</TableCell>
              {day.tasks.map((task, taskIndex) => (
                <TableCell key={taskIndex}>
                  <div className="task-cell">
                    {!task.completed && isTaskTimePassed(day.date, task.time) ? (
                      <IconButton>
                        <CloseIcon style={{ color: 'red' }} />
                      </IconButton>
                    ) : (
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleCheckboxChange(dayIndex, taskIndex)}
                        disabled={isFutureDate(day.date)}
                      />
                    )}
                    <span>{task.activity}</span>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlanTable;
