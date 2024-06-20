import { createTheme } from "@mui/material";

// Dark mode theme with adjusted navbar background color using !important
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d6efd',
    },
    secondary: {
      main: '#495057',
    },
    background: {
      default: '#212529 !important', // Adjust the default background color for dark mode
      paper: '#333 !important', // Adjust the background color for paper elements in dark mode
      navbar: '#333', // Adjust the navbar background color in dark mode
    },
    text: {
      primary: '#fff !important', // Adjust the text color for better readability
    },
  },
});

// Light mode theme with adjusted navbar background color using !important
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#6c757d',
    },
    background: {
      default: '#fff !important', // Adjust the default background color for light mode
      paper: '#f8f9fa !important', // Adjust the background color for paper elements in light mode
      navbar: '#f8f9fa', // Adjust the navbar background color in light mode
    },
    text: {
      primary: '#333 !important', // Adjust the text color for better readability
    },
  },
});
