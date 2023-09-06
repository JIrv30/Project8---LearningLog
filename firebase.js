// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAHaP0my1A9KfQ18tJ3v3YGv08wbm3E0I",
  authDomain: "learning-log-a0905.firebaseapp.com",
  projectId: "learning-log-a0905",
  storageBucket: "learning-log-a0905.appspot.com",
  messagingSenderId: "1078210780217",
  appId: "1:1078210780217:web:2eaff78ae2f15b71c9c1e8",
  measurementId: "G-BBS1RS029B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")
const analytics = getAnalytics(app);