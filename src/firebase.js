// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWuOscW8zvyZfFLVymNm3pSSu8YRPehfA",
  authDomain: "grocery-analytica.firebaseapp.com",
  projectId: "grocery-analytica",
  storageBucket: "grocery-analytica.appspot.com",
  messagingSenderId: "138502363125",
  appId: "1:138502363125:web:35f7dbab9ebb1a9f6f72bc",
  measurementId: "G-98JM6NSMFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile };