import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppRoutes from './routes';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from './Theme/theme';

const App = () => {
  const themeState = useSelector(state => state.theme);
  const [themeMode, setThemeMode] = useState(themeState);

  useEffect(() => {
    setThemeMode(themeState);
  }, [themeState]);

  return (
    <Router>
      <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />

        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes themeMode={themeMode}/>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
};

export default App;
