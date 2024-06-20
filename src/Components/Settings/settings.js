import React, { useState } from 'react';
import './settings.css';
import Switch from '@mui/material/Switch';
import { setTheme } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';

const Settings = ({ setFont }) => {
    const themeState = useSelector(state => state.theme);
    const [isChecked, setChecked] = useState(themeState === 'dark'); // Initialize isChecked based on themeState
    const dispatch = useDispatch();

    const handleChange = (event) => {

        const isChecked = event.target.checked;
        setChecked(isChecked);
        dispatch(setTheme(isChecked ? 'dark' : 'light')); // Dispatch action based on isChecked
    };

    const handleFontChange = (e) => {
        setFont(e.target.value);
    };

    return (
        <div className="settings">
            <label>Dark Mode</label>
            <Switch
                checked={isChecked}
                color='success'
                onChange={handleChange}
            />
            <label htmlFor="font">Select Font:</label>
            <select id="font" onChange={handleFontChange}>
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
            </select>
        </div>
    );
};

export default Settings;
