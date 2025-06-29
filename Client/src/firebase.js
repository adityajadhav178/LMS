// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_qh77l7H0srK0BQEpO7MJP0Og_eZmPU4",
  authDomain: "eduzy-6b16e.firebaseapp.com",
  projectId: "eduzy-6b16e",
  storageBucket: "eduzy-6b16e.firebasestorage.app",
  messagingSenderId: "898407681370",
  appId: "1:898407681370:web:ea4e8d1c84cd3507c03763"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();