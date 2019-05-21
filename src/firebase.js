import firebase from 'firebase/app';
import config from './firebase-config';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

window.firebase = firebase; // Remove in prod

export default firebase;
