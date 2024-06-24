import React, { useState } from 'react';
import './settings.css';
import Switch from '@mui/material/Switch';
import { setTheme } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';


const ThemeSwitch
 = () => {
    const themeState = useSelector(state => state.theme);
    const [isChecked, setChecked] = useState(themeState === 'dark'); // Initialize isChecked based on themeState
    const dispatch = useDispatch();
  
    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        dispatch(setTheme(isChecked ? 'dark' : 'light')); // Dispatch action based on isChecked
    };




 ;

    return (
        <div className="settings">
            <label>Dark Mode</label>
            <Switch
                checked={isChecked}
                color='success'
                onChange={handleChange}
            />

        </div>
    );
};

export default ThemeSwitch;
