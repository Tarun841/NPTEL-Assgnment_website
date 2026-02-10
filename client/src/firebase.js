/**
 * Firebase Client Configuration
 * Initializes Firebase App and Firestore instance.
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDq1ajyKHyjxWQV-7NSr4DqW5queUhZ41o",
    authDomain: "nptel-a96f7.firebaseapp.com",
    projectId: "nptel-a96f7",
    storageBucket: "nptel-a96f7.firebasestorage.app",
    messagingSenderId: "262460748102",
    appId: "1:262460748102:web:b0fae48a70911481303547",
    measurementId: "G-5HJ201R7NH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
