// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEKEY,
  authDomain: "admin-dashboard-29265.firebaseapp.com",
  projectId: "admin-dashboard-29265",
  storageBucket: "admin-dashboard-29265.appspot.com",
  messagingSenderId: "984429290574",
  appId: "1:984429290574:web:ef671b93de9c3e552c4f1f",
  measurementId: "G-GK0NZ8FGBM",
};

//? Firebase operations 

export const handleFirebaseLogin = ({ userPassword, userEmail }) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredentials) => {
        const user = userCredentials.user;
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

