import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { clearMessage } from '../../Redux/firestoreMessage';

export default function SnackbarMessage({ payload }) {

  const { message, isSuccess } = payload;
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  React.useEffect(() => {
    setState((pre) => {
      return {
        ...pre,
        open: message ? true : false
      }
    })

    return () => {

    }
  }, [message])

  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 10000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Clear timeout if component unmounts
    }
  }, [message]);

  if (!message) return null;

  const { open } = state;


  return (
    <Box sx={{ width: 500 }}>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={isSuccess ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
