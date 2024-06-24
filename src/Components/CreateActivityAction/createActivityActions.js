import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ScheduleIcon from '@mui/icons-material/Schedule';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EventIcon from '@mui/icons-material/Event';

const actions = [
  { icon: <ScheduleIcon />, name: 'Create hourly Routine', shortName: 'hourly' },
  { icon: <NoteAddIcon />, name: 'Add Thoughts', shortName: 'thoughts' },
  { icon: <PlaylistAddCheckIcon />, name: 'Create To-do List', shortName: 'to-do' },
  { icon: <FavoriteIcon />, name: 'Personal Well-being', shortName: 'well-being' },
  { icon: <RestaurantMenuIcon />, name: 'Diet and Meal taken', shortName: 'diet' },

];

export default function CreateActivity({ getName }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // Open the modal to add the desired task
  const handleAction = (action) => {
    getName(action.shortName);
    handleClose();
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1300 }}>
      <Backdrop open={open} onClick={handleClose} sx={{ zIndex: 1200 }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<SpeedDialIcon />}
        sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 1301 }}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleAction(action)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
