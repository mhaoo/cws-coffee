import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBST2kmy6gWK0D252ud2euttTjo6iXpNAk",
  authDomain: "cws-coffee.firebaseapp.com",
  projectId: "cws-coffee",
  storageBucket: "cws-coffee.appspot.com",
  messagingSenderId: "574926668109",
  appId: "1:574926668109:web:9add17669e4f683280f704",
  measurementId: "G-TXNGLHBFD4",
};

// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
