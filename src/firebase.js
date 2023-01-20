import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBkJ6iBrf05e9lM3zc59-tQ0P8XkRp_XQs",
    authDomain: "react-blogs-app-1c8f1.firebaseapp.com",
    projectId: "react-blogs-app-1c8f1",
    storageBucket: "react-blogs-app-1c8f1.appspot.com",
    messagingSenderId: "868996252456",
    appId: "1:868996252456:web:deea473efdfd556252461d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };