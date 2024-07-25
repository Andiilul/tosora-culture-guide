// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_PUBLIC_apiKey,
	authDomain: import.meta.env.VITE_PUBLIC_authDomain,
	projectId: import.meta.env.VITE_PUBLIC_projectId,
	storageBucket: import.meta.env.VITE_PUBLIC_storageBucket,
	messagingSenderId: import.meta.env.VITE_PUBLIC_messagingSenderId,
	appId: import.meta.env.VITE_PUBLIC_appId,
	measurementId: import.meta.env.VITE_PUBLIC_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
