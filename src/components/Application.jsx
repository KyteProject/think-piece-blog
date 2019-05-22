import React, { useState, useEffect } from 'react';
import { collectPosts } from '../utils';
import { firestore, auth, createUserProfileDocument } from '../firebase';
import Posts from './Posts';
import Authentication from './Authentication';

const Application = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribeAuth = auth.onAuthStateChanged(async userAuth => {
			const user = await createUserProfileDocument(userAuth);

			setUser(user);
		});

		return () => {
			unsubscribeAuth();
		};
	}, []);

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Authentication user={user} />
			<Posts />
		</main>
	);
};

export default Application;
