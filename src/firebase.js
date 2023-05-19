// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq5KgoO5bloRmFoo9P0ws4dPMV2VvYjIM",
  authDomain: "react-todo-8ddda.firebaseapp.com",
  projectId: "react-todo-8ddda",
  storageBucket: "react-todo-8ddda.appspot.com",
  messagingSenderId: "377730800667",
  appId: "1:377730800667:web:2fd99444032d7dc9736cbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db};