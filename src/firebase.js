// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK_2ngNWGWD_oS-tA5VX6W7M7IxPzBKe0",
  authDomain: "attendance-app-8ed8b.firebaseapp.com",
  projectId: "attendance-app-8ed8b",
  storageBucket: "attendance-app-8ed8b.firebasestorage.app",
  messagingSenderId: "195915809817",
  appId: "1:195915809817:web:8d2ec4ca8d8b9bb4961688",
  measurementId: "G-SQ9Z9M7945"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };