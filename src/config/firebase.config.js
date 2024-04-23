// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2qEz7DrZrBtRcb_m8MRGGO25Saj8ISZQ",
  authDomain: "contact-app-81f0e.firebaseapp.com",
  projectId: "contact-app-81f0e",
  storageBucket: "contact-app-81f0e.appspot.com",
  messagingSenderId: "158621417508",
  appId: "1:158621417508:web:c40b7ec8b5fb3911e518b1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
