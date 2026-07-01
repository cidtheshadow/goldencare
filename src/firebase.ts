import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCL_TlPcsO5QyNMn13p7mfzBzxqvIlZfbo",
  authDomain: "golden-care-d4863.firebaseapp.com",
  projectId: "golden-care-d4863",
  storageBucket: "golden-care-d4863.firebasestorage.app",
  messagingSenderId: "143097198020",
  appId: "1:143097198020:web:f6b10aeae251fa9f5b2091",
  measurementId: "G-0MQHW3VZQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
