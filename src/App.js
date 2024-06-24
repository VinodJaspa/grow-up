import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppRoutes from './routes';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getLightTheme, getDarkTheme } from './Theme/theme';
import BouncingDotsLoader from './Components/BouncingLoader/bouncingLoader';
import SnackbarMessage from './Components/ToastMessages/snackBarToast';

const App = () => {
  const themeState = useSelector(state => state.theme);
  const fontStyle = useSelector(state => state.font);
  const isLoading = useSelector(state => state.loadingState?.loading);
  const message = useSelector(state => state.firestoreMessage);
  const [themeMode, setThemeMode] = useState(themeState);
  console.log(message, "message");
  console.log(isLoading, "isLoading");
  useEffect(() => {
    setThemeMode(themeState);
  }, [themeState]);
  const theme = themeMode === 'dark' ? getDarkTheme(fontStyle) : getLightTheme(fontStyle);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* {isLoading && <BouncingDotsLoader />} */}
        <Suspense fallback={BouncingDotsLoader}>
         
          <>
            <AppRoutes themeMode={themeMode} />
            <SnackbarMessage payload={message}/>
          </>
        
          
        </Suspense>
      </ThemeProvider>
    </Router>
  );
};

export default App;
