import React, { useCallback } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFont } from '../../Redux/store';

const FontSettings = () => {
  const fontStyle = useSelector(state => state.font);
  const { fontSize, fontFamily } = fontStyle;
  const dispatch = useDispatch();
  const handleFontFamilyChange = useCallback((event) => {
    const newFontStyle = { fontFamily: event.target.value, fontSize };
    dispatch(setFont(newFontStyle));

  }, [fontSize]);

  const handleFontSizeChange = useCallback((_, value) => {
    const newFontStyle = { fontFamily, fontSize: value };
    dispatch(setFont(newFontStyle));
    
  }, [fontFamily]);



  return (
    <Box sx={{ maxWidth: 300 }}>
      <Typography variant="h6" gutterBottom>
        Font Settings
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="font-family-label">Font Family</InputLabel>
        <Select
          labelId="font-family-label"
          id="font-family"
          value={fontFamily}
          onChange={handleFontFamilyChange}
          label="Font Family"
        >
          <MenuItem value="Roboto">Roboto</MenuItem>
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Helvetica">Helvetica</MenuItem>
          <MenuItem value="SansSerif">Sans Serif</MenuItem>
          <MenuItem value="Pacifico">Pacifico</MenuItem>
        </Select>
      </FormControl>
      <Typography id="font-size-slider" gutterBottom>
        Font Size: {fontSize}
      </Typography>
      <Slider
        aria-label="font-size-slider"
        defaultValue={fontSize}
        min={10}
        max={20}
        step={2}
        onChange={handleFontSizeChange}
      />
    </Box>
  );
};

export default FontSettings;
