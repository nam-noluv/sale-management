
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEY6bEGqAhhplKR5ID5RwJzOInqJcL27g",
  authDomain: "sale-69e7b.firebaseapp.com",
  projectId: "sale-69e7b",
  storageBucket: "sale-69e7b.firebasestorage.app",
  messagingSenderId: "293552266841",
  appId: "1:293552266841:web:0714f264ba2e4ea68a9b48",
  measurementId: "G-VN1TRZG2BV"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
