import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import authReducer from './userSlice';
import loadingReducer from "./loadingState";
import messsageReducer from "./firestoreMessage"
// Initial states
const initialPlan = [];
const initialMoodData = Array(30).fill(''); 
const initialThemeState = 'light'; 
const initialFontState ={
  fontFamily:'Pacifico',
  fontSize:12,
}

// Slices
const planSlice = createSlice({
  name: 'plan',
  initialState: initialPlan,
  reducers: {
    setPlan(_state, action) {
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
    setTheme(_state, action) {
      console.log(action.payload,"opaass");
      return action.payload;
    }}
});
const fontSlice = createSlice({
  name: 'font',
  initialState: initialFontState ,
  reducers: {
    setFont(_state, action) {
      return action.payload;
    }}
});

export const { setPlan, toggleTask } = planSlice.actions;
export const { setMood } = moodSlice.actions;
export const { setTheme } = themeSlice.actions;
export const { setFont } = fontSlice.actions;


// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', "theme" , 'font'], 
};

const rootReducer = combineReducers({
  plan: planSlice.reducer,
  mood: moodSlice.reducer,
  theme: themeSlice.reducer,
  font:fontSlice.reducer,
  auth: authReducer,
  loadingState:loadingReducer,
  firestoreMessage:messsageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
