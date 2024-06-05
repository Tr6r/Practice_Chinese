import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABCBv69YVo1Rbl9VgCG9XHhw27xcolFvU",
    authDomain: "cuong-fc37b.firebaseapp.com",
    projectId: "cuong-fc37b",
    storageBucket: "cuong-fc37b.appspot.com",
    messagingSenderId: "1060299551216",
    appId: "1:1060299551216:web:d05998143492d0c2f92d35",
    measurementId: "G-FJGNHT5E4F"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };