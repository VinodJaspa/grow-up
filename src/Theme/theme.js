import { createTheme } from "@mui/material";

const getDarkTheme = (fontStyle) => createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d6efd',
    },
    secondary: {
      main: '#495057',
    },
    background: {
      default: '#212529 !important',
      paper: '#333 !important',
      navbar: '#333 !important',
   
    },
    button: {
      backgroundColor:'#0C1844 !important',
     },
    text: {
      primary: '#fff !important',
    },
  },
  typography: {
    fontFamily: fontStyle.fontFamily,
    fontSize:fontStyle.fontSize

  },
});

const getLightTheme = (fontStyle) => createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#6c757d',
    },
    background: {
      default: '#fff !important',
      paper: '#f8f9fa !important',
      navbar: '#f8f9fa',
     

    },
    text: {
      primary: '#333 !important',
    },
       button: {
        backgroundColor:'#0C1844 !important',
       }
  },
  typography: {
    fontFamily: fontStyle.fontFamily,
    fontSize:fontStyle.fontSize
  },
});
export {getDarkTheme , getLightTheme}