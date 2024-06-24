// loadingSlice.js

import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'lodingState',
  initialState: {
   loading: false,
  },
  reducers: {
   
    setUniversalLoading: (state, action) => {
    state.loading = action.payload;
    },
   
  },
});

export const { setUniversalLoading } = loadingSlice.actions;


export default loadingSlice.reducer;
