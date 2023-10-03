
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { 
  apiKey: "AIzaSyADRHun2w0nfHFME49xOp6lvFCf-_9ESoo",
  authDomain: "menu-project-33582.firebaseapp.com",
  projectId: "menu-project-33582",
  storageBucket: "menu-project-33582.appspot.com",
  messagingSenderId: "726237356185",
  appId: "1:726237356185:web:8ede34808975c5219e1808",
  measurementId: "G-4LSV785H9W"
}; // Firebase config bilgileriniz

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;
