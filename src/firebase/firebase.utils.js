import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCoGUKG3hW2a8d826MwEZsaXmtOUTnYgx4",
  authDomain: "crwn-db-66c25.firebaseapp.com",
  databaseURL: "https://crwn-db-66c25.firebaseio.com",
  projectId: "crwn-db-66c25",
  storageBucket: "crwn-db-66c25.appspot.com",
  messagingSenderId: "1084564884119",
  appId: "1:1084564884119:web:a0c36a3896f50f69e337d2",
  measurementId: "G-4EEKBQ0JMN",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
