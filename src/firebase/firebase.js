// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
const createUserAndSaveToFB = () => {};
const uploadFileToFBStorage = () => {};

const handleFirebaseLogin = ({ userPassword, userEmail }) => {
  const auth = getAuth();
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

export { createUserAndSaveToFB, uploadFileToFBStorage, handleFirebaseLogin };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
