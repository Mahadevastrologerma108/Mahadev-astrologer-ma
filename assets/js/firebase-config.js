// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgcfrzQm6wezgtU5Q5BP8wxXatmoWqYrw",
  authDomain: "mahadev-astrologer.firebaseapp.com",
  databaseURL: "https://mahadev-astrologer-default-rtdb.firebaseio.com",
  projectId: "mahadev-astrologer",
  storageBucket: "mahadev-astrologer.firebasestorage.app",
  messagingSenderId: "559664802739",
  appId: "1:559664802739:web:4285f4dc461f570cc2b9c6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Database connection string
const db = firebase.database();
