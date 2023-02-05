 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh9xPdAJ6qNGj9ZLvpFTUdthpkAlRZIiY",
  authDomain: "todo-app-79c7e.firebaseapp.com",
  projectId: "todo-app-79c7e",
  storageBucket: "todo-app-79c7e.appspot.com",
  messagingSenderId: "329543897253",
  appId: "1:329543897253:web:0bff8b8cc8bcc8ce68fd4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db=getFirestore(app); 