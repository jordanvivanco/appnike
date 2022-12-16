// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_44otaG6aVlkwu06d-sAnmDLzhWylI94",
  authDomain: "app-nike-3d22d.firebaseapp.com",
  databaseURL: "https://app-nike-3d22d-default-rtdb.firebaseio.com",
  projectId: "app-nike-3d22d",
  storageBucket: "app-nike-3d22d.appspot.com",
  messagingSenderId: "43211281638",
  appId: "1:43211281638:web:eece524bc3974c3cb0d727"
};

const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();