// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBST2kmy6gWK0D252ud2euttTjo6iXpNAk",
  authDomain: "cws-coffee.firebaseapp.com",
  projectId: "cws-coffee",
  storageBucket: "cws-coffee.appspot.com",
  messagingSenderId: "574926668109",
  appId: "1:574926668109:web:9add17669e4f683280f704",
  measurementId: "G-TXNGLHBFD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

export {app, auth, getApp, getAuth}