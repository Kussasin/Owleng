// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLMFkOwtGjKx1JpNjpZZ7YgxvKRP8bwX8",
  authDomain: "owleng-b97dc.firebaseapp.com",
  projectId: "owleng-b97dc",
  storageBucket: "owleng-b97dc.appspot.com",
  messagingSenderId: "464310705470",
  appId: "1:464310705470:web:03d4e423dac76afc02e06f",
  databaseURL: "https://owleng-b97dc-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export const auth = getAuth(app);