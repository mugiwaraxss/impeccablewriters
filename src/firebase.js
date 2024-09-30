// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmriXjppvt2uF6vVVw_rwLswRIcIbC3sE",
  authDomain: "impeccablewriters-a82c8.firebaseapp.com",
  projectId: "impeccablewriters-a82c8",
  storageBucket: "impeccablewriters-a82c8.appspot.com",
  messagingSenderId: "736992378182",
  appId: "1:736992378182:web:128c6b3f4833f162537947",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
