import React, { useState, useEffect } from 'react';
import { collectPosts } from '../utils';
import { firestore, auth, createUserProfileDocument } from '../firebase';
import Posts from './Posts';
import Authentication from './Authentication';

const Application = () => {
	const [posts, setPosts] = useState([]),
		[user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribePosts = firestore
			.collection('posts')
			.onSnapshot(snapshot => setPosts(snapshot.docs.map(collectPosts)));

		const unsubscribeAuth = auth.onAuthStateChanged(async userAuth => {
			const user = await createUserProfileDocument(userAuth);

			setUser(user);
		});

		return () => {
			unsubscribePosts();
			unsubscribeAuth();
		};
	}, []);

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Authentication user={user} />
			<Posts posts={posts} />
		</main>
	);
};

export default Application;
