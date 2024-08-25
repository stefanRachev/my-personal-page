import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCT05GgrpZylB9PfkNoNlZgEv23lBSgrQ4",
  authDomain: "stefan-works.firebaseapp.com",
  projectId: "stefan-works",
  storageBucket: "stefan-works.appspot.com",
  messagingSenderId: "11322404055",
  appId: "1:11322404055:web:46194eb2f1f4e488165492",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
