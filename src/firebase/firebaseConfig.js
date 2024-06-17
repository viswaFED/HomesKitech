// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj2fP-6DQM44HBQed8q6MwKwECjVGNCYA",
  authDomain: "reciipiie-33bae.firebaseapp.com",
  projectId: "reciipiie-33bae",
  storageBucket: "reciipiie-33bae.appspot.com",
  messagingSenderId: "776959509595",
  appId: "1:776959509595:web:f047354062810f9b9ceb7e",
  measurementId: "G-0DLKJ7GSRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
