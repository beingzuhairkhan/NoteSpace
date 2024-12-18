import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBK1plk3vsOxTmYfvhDLSsEb9zoHNm-swU",
  authDomain: "notion-clone-6235e.firebaseapp.com",
  projectId: "notion-clone-6235e",
  storageBucket: "notion-clone-6235e.appspot.com",
  messagingSenderId: "195454738714",
  appId: "1:195454738714:web:e925fc6a63a2f1d95a4ca3",
  measurementId: "G-TDVHNWJV3L",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

console.log("Firebase database connected successfully."); 

export { db }; 
