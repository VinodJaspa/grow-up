// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../src/Firebase/firebaseConfig"
import { setUniversalMessage } from './firestoreMessage';
import authMessages from '../Comman/authMessages';
import { setUniversalLoading } from './loadingState';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutStart(state) {
      state.status = 'loading';
    },
    logoutSuccess(state) {
      state.status = 'succeeded';
      state.user = null;
    },
    logoutFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

  },
});
export const { setUser, setLoading, setError } = authSlice.actions;

export const loginUser = (user) => async (dispatch) => {
  dispatch(setUniversalLoading(true));

  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      dispatch(setUniversalMessage({ message: authMessages.loggedIn, isSuccess: true }));
      dispatch(setUniversalLoading(false));
      saveUser(user, dispatch);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch(setUniversalMessage({ message: errorMessage, isSuccess: false }));
      dispatch(setUniversalLoading(false));


    });

};

export const signupUser = (email, password) => async (dispatch) => {
  dispatch(setUniversalLoading(true));

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;

      dispatch(setUniversalMessage({ message: authMessages.registerSuccess, isSuccess: true }));
      dispatch(setUniversalLoading(false));

      saveUser(user, dispatch);


    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch(setUniversalMessage({ message: errorMessage, isSuccess: false }));
      dispatch(setUniversalLoading(false));


    });
};
//Save the user in redux
const saveUser = (user, dispatch) => {
  let userInfo = {
    email: user?.email,
    uid: user?.uid,
    displayName: user?.displayName,
    accessToken: user?.accessToken,
    photoURL: user?.photoURL,
    phoneNumber: user?.phoneNumber
  }
  dispatch(setUser(userInfo));
}
//Logout user
export const { logoutStart, logoutSuccess, logoutFailure } = authSlice.actions;

export const logoutUser = () => async (dispatch) => {
  dispatch(setUniversalLoading(true));
  try {
    await signOut(auth);

    dispatch(logoutSuccess());
    dispatch(setUniversalLoading(false));

  } catch (error) {
    dispatch(logoutFailure(error.message));
    dispatch(setUniversalLoading(false));

  }
};


export default authSlice.reducer;
