import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import authReducer from './userSlice';
// Initial states
const initialPlan = [];
const initialMoodData = Array(30).fill(''); // 30-day mood data initialized to empty
const initialThemeState = 'light'; // Define initial theme state

// Slices
const planSlice = createSlice({
  name: 'plan',
  initialState: initialPlan,
  reducers: {
    setPlan(state, action) {
      return action.payload;
    },
    toggleTask(state, action) {
      const { dayIndex, taskIndex } = action.payload;
      state[dayIndex].tasks[taskIndex].completed = !state[dayIndex].tasks[taskIndex].completed;
    }
  }
});

const moodSlice = createSlice({
  name: 'mood',
  initialState: initialMoodData,
  reducers: {
    setMood(state, action) {
      const { dayIndex, mood } = action.payload;
      state[dayIndex] = mood;
    }
  }
});

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState ,// Define initial state object for theme
  reducers: {
    setTheme(state, action) {
      console.log(action.payload,"opaass");
      
      return action.payload;
    }
  }
});

export const { setPlan, toggleTask } = planSlice.actions;
export const { setMood } = moodSlice.actions;
export const { setTheme } = themeSlice.actions;

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  plan: planSlice.reducer,
  mood: moodSlice.reducer,
  theme: themeSlice.reducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
