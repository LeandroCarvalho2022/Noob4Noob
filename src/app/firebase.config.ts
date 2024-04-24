// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHnFfKw75jHPgs8oi1DAq-QNF5DaVtlIw",
  authDomain: "maway-950d1.firebaseapp.com",
  projectId: "maway-950d1",
  storageBucket: "maway-950d1.appspot.com",
  messagingSenderId: "649352085180",
  appId: "1:649352085180:web:e0747dd11b54eabeaf5ab9",
  measurementId: "G-QVBXTS0HJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);