import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAJAQXYk5Tbve65eqDe2WH_ZmDImiXu7Vg",
    authDomain: "nsa-alsemito.firebaseapp.com",
    projectId: "nsa-alsemito",
    storageBucket: "nsa-alsemito.firebasestorage.app",
    messagingSenderId: "167328561057",
    appId: "1:167328561057:web:306aa296e9a05c6e643de0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };