// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/Firebase/firebaseConfig"
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;

export const loginUser = (user) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log(user, "user");
  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user.accessToken;
      console.log(user,"user___");
      dispatch(setUser(user));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message, "error");
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
    });



};

export const signupUser = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user.accessToken;
      dispatch(setUser(user));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
  
    });



};

export default authSlice.reducer;
