// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfeVMvpbk-B76_VEf5ciC-roOe3ovpOQY",
  authDomain: "summarist-c16b5.firebaseapp.com",
  projectId: "summarist-c16b5",
  storageBucket: "summarist-c16b5.appspot.com",
  messagingSenderId: "659973604812",
  appId: "1:659973604812:web:00e34b5c54aaec21060969",
  measurementId: "G-S1S3G0K03R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);