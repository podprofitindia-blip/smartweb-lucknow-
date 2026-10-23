import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBtRqBBrXTilnV_6GP4MQMVTQbuOF9VaAM",
  authDomain: "smartweb-lucknow.firebaseapp.com",
  projectId: "smartweb-lucknow",
  storageBucket: "smartweb-lucknow.firebasestorage.app",
  messagingSenderId: "354351624178",
  appId: "1:354351624178:web:117f406da753dea174c56b",
  measurementId: "G-VXZZP3JXZ7"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
