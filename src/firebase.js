// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAtkZ50A8mKUrFXnyBGVEAp3KEq7WaCX7g",
    authDomain: "breamdemo-c936f.firebaseapp.com",
    databaseURL: "https://breamdemo-c936f-default-rtdb.firebaseio.com",
    projectId: "breamdemo-c936f",
    storageBucket: "breamdemo-c936f.appspot.com",
    messagingSenderId: "62609148612",
    appId: "1:62609148612:web:18d54ba13676e498579791"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;