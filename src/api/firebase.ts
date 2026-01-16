import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyB6cqb2CYxfrMhNTUk_kXXRNoEO6tEixXQ",
//     authDomain: "my-recipes-store.firebaseapp.com",
//     projectId: "my-recipes-store",
//     storageBucket: "my-recipes-store.appspot.com",
//     messagingSenderId: "288664452275",
//     appId: "1:288664452275:web:9a176a122845ab0d59c4c6"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBtnUhzTWrVdoe7-bxT8GLqkXriaKUKx-8",
  authDomain: "my-recipes-store.firebaseapp.com",
  projectId: "my-recipes-store",
  storageBucket: "my-recipes-store.appspot.com",
  messagingSenderId: "288664452275",
  appId: "1:288664452275:web:23c763a378e29d9f59c4c6",
};

const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
