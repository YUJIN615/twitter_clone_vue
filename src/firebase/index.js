import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHzB_B7sV1UDaD1MV3exjiTLSym-ztNCU",
  authDomain: "twitter-clone-f6a90.firebaseapp.com",
  projectId: "twitter-clone-f6a90",
  storageBucket: "twitter-clone-f6a90.appspot.com",
  messagingSenderId: "734582486904",
  appId: "1:734582486904:web:79830172a78ec51ab57a8d",
  measurementId: "G-EL5BBWKE8E",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const USER_COLLECTION = db.collection("users");
