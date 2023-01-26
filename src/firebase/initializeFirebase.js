// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3zCTTeXpRDY9COagQpI-LOvNNDjhLuXQ",
  authDomain: "chatkel.firebaseapp.com",
  projectId: "chatkel",
  storageBucket: "chatkel.appspot.com",
  messagingSenderId: "543143986526",
  appId: "1:543143986526:web:292e8e8dc3c4932756bbcf",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
