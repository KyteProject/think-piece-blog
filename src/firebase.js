import firebase from 'firebase/app';
import config from './firebase-config';
import 'firebase/firestore';

firebase.initializeApp(config);

export const firestore = firebase.firestore();

window.firebase = firebase; // Remove in prod

export default firebase;
