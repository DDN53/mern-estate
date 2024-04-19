// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sl-voteing.firebaseapp.com",
  projectId: "sl-voteing",
  storageBucket: "sl-voteing.appspot.com",
  messagingSenderId: "712553039426",
  appId: "1:712553039426:web:de65ff26c5eca1e2a68fdb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
