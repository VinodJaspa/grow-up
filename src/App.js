import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPlan } from './Redux/store';
import Navbar from './Components/NavBar/nav-bar';
import TaskTable from './Components/TaskTable/task-table';
import PerformanceGraph from './Components/PerfromanceChart/performance-graph';
import MoodTracker from './Components/MoodTracker/mood-tracker';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { generate30DayPlan } from './Helper/utlity-30-day-plan';
import './App.css'; // Import your CSS file here
import ChallengesTabs from './Pages/challengesTab';
import Settings from './Components/Settings/settings';

import { ThemeProvider, createTheme } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
function App() {

  const dispatch = useDispatch()

  const createPlan = () => {
    dispatch(setPlan(generate30DayPlan()));

  };
  const themeState = useSelector(state => state.theme);
  const [themeMode, setThemeMode] = useState(themeState);

console.log(themeMode,"mode____");

  React.useEffect(() => {
    const darkTheme = createTheme({
      palette: {
        mode: themeMode,
      },
    });

    setDarkTheme(darkTheme);
  }, [themeMode]);

  const [darkTheme, setDarkTheme] = useState(() =>
    createTheme({
      palette: {
        mode: themeMode,
      },
    })
  );

  const plan = useSelector(state => state.plan);
  // App.js or main component
  React.useEffect(() => {
    Notification.requestPermission();
  }, []);

  return (

    <Router>
      <div className="App">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Navbar />

          {plan.length === 0 ? (
            <button onClick={createPlan}>Create 30-Day Plan</button>
          ) : (
            ''
          )}
          {plan.length > 0 && (
            <Routes>
              <Route path="/table" element={<TaskTable />} />
              <Route path="/graph" element={<PerformanceGraph />} />
              <Route path="/mood" element={<MoodTracker />} />
              <Route path="/growth" element={<ChallengesTabs />} />
              <Route path="/settings" element={<Settings />} />

            </Routes>
          )}
        </ThemeProvider>
      </div>
    </Router>

  );
}

export default App;