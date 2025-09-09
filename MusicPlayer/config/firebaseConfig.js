// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoJsiqVqQihpYe6YXRy9pD3BaRuc9dh1w",
  authDomain: "musicplayer-31811.firebaseapp.com",
  projectId: "musicplayer-31811",
  storageBucket: "musicplayer-31811.firebasestorage.app",
  messagingSenderId: "134877900445",
  appId: "1:134877900445:web:6a760f515516134fa66e74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);