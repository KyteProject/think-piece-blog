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

export const createUserProfileDocument = async (user, additionalData) => {
	if (!user) return;

	try {
		const userRef = firestore.doc(`users/${user.uid}`),
			snapshot = await userRef.get();

		if (!snapshot.exists) {
			const createdAt = new Date(),
				{ displayName, email, photoURL } = user;

			console.log(user);

			try {
				await userRef.set({
					displayName,
					email,
					photoURL,
					createdAt,
					...additionalData,
				});
			} catch (err) {
				return console.error('Error creating user', err.message);
			}
		}
	} catch (err) {
		return console.error(err.message);
	}

	return getUserDocument(user);
};

export const getUserDocument = async user => {
	if (!user) return null;

	const uid = user.uid;

	try {
		const userRef = firestore.doc(`users/${uid}`),
			snapshot = await userRef.get();

		return { uid, ...snapshot.data() };
	} catch (err) {
		console.error('Error fetching user', err.message);
	}
};

window.firebase = firebase;

export default firebase;
