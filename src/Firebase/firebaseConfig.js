// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA47eme4gQXAcCiMU9azD8im3yzSl1yyNw",
  authDomain: "gear-up-18281.firebaseapp.com",
  projectId: "gear-up-18281",
  storageBucket: "gear-up-18281.appspot.com",
  messagingSenderId: "871314166300",
  appId: "1:871314166300:web:e7c9f7d2ae5a8f068a85d9",
  measurementId: "G-NHQ2V7SCQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Authentication and Firestore
const auth = getAuth(app);
const firestoreDb = getFirestore(app);

// Export the initialized instances
export { app, analytics, auth, firestoreDb };
