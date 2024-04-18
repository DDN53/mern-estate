// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c4f36.firebaseapp.com",
  projectId: "mern-estate-c4f36",
  storageBucket: "mern-estate-c4f36.appspot.com",
  messagingSenderId: "452977709019",
  appId: "1:452977709019:web:899363c7340c8b6278a1fe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
