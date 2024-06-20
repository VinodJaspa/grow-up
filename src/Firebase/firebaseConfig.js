// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA47eme4gQXAcCiMU9azD8im3yzSl1yyNw",
  authDomain: "gear-up-18281.firebaseapp.com",
  projectId: "gear-up-18281",
  storageBucket: "gear-up-18281.appspot.com",
  messagingSenderId: "871314166300",
  appId: "1:871314166300:web:e7c9f7d2ae5a8f068a85d9",
  measurementId: "G-NHQ2V7SCQM"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
const analytics = getAnalytics(app);