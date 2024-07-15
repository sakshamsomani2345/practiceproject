// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mern-blog-3fbdb.firebaseapp.com",
  projectId: "mern-blog-3fbdb",
  storageBucket: "mern-blog-3fbdb.appspot.com",
  messagingSenderId: "749543339518",
  appId: "1:749543339518:web:904dafabbfdd80bac83caf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);