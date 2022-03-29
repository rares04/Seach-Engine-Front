// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZANJvKXCXVwgo-L-VzB1v5q0zu-c4zC4",
  authDomain: "ubb-search.firebaseapp.com",
  projectId: "ubb-search",
  storageBucket: "ubb-search.appspot.com",
  messagingSenderId: "1040767576511",
  appId: "1:1040767576511:web:02dc55d3fd3d8420f7990a",
  measurementId: "G-S0CKQ9EL2K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore()
// const analytics = getAnalytics(app);

export { firebase, firestore }