// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_VJhC6g1CYEtkFx4pQC1YShPmnqB-cQI",
  authDomain: "shop-cali.firebaseapp.com",
  projectId: "shop-cali",
  storageBucket: "shop-cali.appspot.com",
  messagingSenderId: "1050434042172",
  appId: "1:1050434042172:web:55d490fa10a031c9fb4639"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp