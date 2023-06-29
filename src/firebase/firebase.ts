// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, setUserProperties } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2phWDOSp__wfk5oUKinAlNyN9eM-VMm4",
  authDomain: "queuing-ca45c.firebaseapp.com",
  projectId: "queuing-ca45c",
  storageBucket: "queuing-ca45c.appspot.com",
  messagingSenderId: "532186312099",
  appId: "1:532186312099:web:9224878466d26a1ef0fe16",
  measurementId: "G-EP9FGKRR5S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics();
setUserProperties(analytics, { role: '',active:'' });