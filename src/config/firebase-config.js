import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfwXz6fnQ4TMMgO4vwK7q7g4rqUQLwjn0",
  authDomain: "todo-app-7e5cb.firebaseapp.com",
  projectId: "todo-app-7e5cb",
  storageBucket: "todo-app-7e5cb.appspot.com",
  messagingSenderId: "822553617787",
  appId: "1:822553617787:web:177ab3d7aa61da0eba89de",
  measurementId: "G-FB8Q47Z6MY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

