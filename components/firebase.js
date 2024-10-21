import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAhAM_7tGxd_JhH1w9vtOCHJkO5bKsIhac",
    authDomain: "nsa-faltas.firebaseapp.com",
    projectId: "nsa-faltas",
    storageBucket: "nsa-faltas.appspot.com",
    messagingSenderId: "626963777145",
    appId: "1:626963777145:web:b32f2adf8bb23ca494f6a8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };