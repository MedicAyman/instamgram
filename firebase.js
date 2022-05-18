// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrCE3uulWNHje7zgaImz8OrcznBfnkGQg",
  authDomain: "instagram-f18c6.firebaseapp.com",
  projectId: "instagram-f18c6",
  storageBucket: "instagram-f18c6.appspot.com",
  messagingSenderId: "49809288886",
  appId: "1:49809288886:web:92776c6e9db7ad181ec017",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFireStore();
const storage = getStorage();

export { app, db, storage };
