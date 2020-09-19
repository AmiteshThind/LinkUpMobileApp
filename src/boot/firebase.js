//initlaize firebase on boot 

import * as firebase from "firebase/app";


// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database"

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBnSx6JFgL7gNE-w9Xr6ZPDUMOwQIHohhk",
    authDomain: "linkup-77d75.firebaseapp.com",
    databaseURL: "https://linkup-77d75.firebaseio.com",
    projectId: "linkup-77d75",
    storageBucket: "linkup-77d75.appspot.com",
    messagingSenderId: "1097491215789",
    appId: "1:1097491215789:web:dccbdb6daf889e95131d24"
  };
  // Initialize Firebase
  let firebaseApp = firebase.initializeApp(firebaseConfig);
  let firebaseAuth = firebaseApp.auth()

  let firebaseDb = firebaseApp.database();

  export {
    firebaseAuth,
    firebaseDb //export so we can use the firebaseAuth api for login/register within our app
  }

