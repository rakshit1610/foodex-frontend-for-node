import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAf2G9_3NQYdccEb2U10oVRCGjOAcpW5Mc",
    authDomain: "foodex-mern.firebaseapp.com",
    projectId: "foodex-mern",
    storageBucket: "foodex-mern.appspot.com",
    messagingSenderId: "539591352927",
    appId: "1:539591352927:web:287b9c64420f6fd0c671ea"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };