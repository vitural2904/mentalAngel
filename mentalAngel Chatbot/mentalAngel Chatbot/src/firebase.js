// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDljt9iH36UulKOLBhF7OSR9BETxDiwzZ4",
  authDomain: "mentalangel-5e5e2.firebaseapp.com",
  projectId: "mentalangel-5e5e2",
  storageBucket: "mentalangel-5e5e2.appspot.com",
  messagingSenderId: "967721378364",
  appId: "1:967721378364:web:8d46b4728197615062d939",
  measurementId: "G-789P8XYWPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);