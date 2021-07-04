import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBEzLQPsY7Je-rk9SDLXkFVTdJM5jsQtVE",
    authDomain: "mobient-7c164.firebaseapp.com",
    projectId: "mobient-7c164",
    storageBucket: "mobient-7c164.appspot.com",
    messagingSenderId: "419838495406",
    appId: "1:419838495406:web:c2f47301a7dabe5ee4fb3f",
    measurementId: "G-26L25HL2C9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };