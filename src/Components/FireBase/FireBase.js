// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeQOj90KfOzTIcneCV_OyFBuYJ_oS3dQU",
  authDomain: "email-password-9055b.firebaseapp.com",
  projectId: "email-password-9055b",
  storageBucket: "email-password-9055b.firebasestorage.app",
  messagingSenderId: "1053067104024",
  appId: "1:1053067104024:web:ecefc75f2ede5ec181d86d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;