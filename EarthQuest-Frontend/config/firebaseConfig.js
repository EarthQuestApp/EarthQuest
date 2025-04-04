// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlUDgvboUG05refEKnu3v9SNttjfrm31g",
  authDomain: "earthquest-c7d15.firebaseapp.com",
  projectId: "earthquest-c7d15",
  storageBucket: "gs://earthquest-c7d15.firebasestorage.app",
  messagingSenderId: "1097311545726",
  appId: "1:1097311545726:web:dfd9d0ab914aa82896ab2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app); 

export { storage, auth, ref, getDownloadURL };
