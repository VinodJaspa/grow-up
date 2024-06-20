import React from 'react';
import "./settings.css"
import { Switch } from '@mui/material';
import { setTheme } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
const Settings = ({ setFont }) => {
    const [isChecked, setChecked] = useState(false);
    const dispatch = useDispatch()
    const handleFontChange = (e) => {
        setFont(e.target.value);

    };


    const handleChange = (event) => {
        
        if (event.target.checked) {
            dispatch(setTheme('dark'));

        } else {
            dispatch(setTheme('light'));

        }
        setChecked(event.target.checked);

    }
    return (
        <div className="settings">

            <label>Dark Mode</label>
            <Switch
                checked={isChecked}
                color='success'
                onChange={handleChange} />
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
