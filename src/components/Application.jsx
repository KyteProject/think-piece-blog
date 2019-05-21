import React, { useState, useEffect } from 'react';
import { collectPosts } from '../utils';
import { firestore, auth } from '../firebase';
import Posts from './Posts';
import Authentication from './Authentication';

const Application = () => {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(
		() => {
			const unsubscribePosts = firestore
				.collection('posts')
				.onSnapshot(snapshot => setPosts(snapshot.docs.map(collectPosts)));

			const unsubscribeAuth = auth.onAuthStateChanged(user => setUser(user));

			return () => {
				unsubscribePosts();
				unsubscribeAuth();
			};
		},
		[posts, user]
	);

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Authentication user={user} />
			<Posts posts={posts} />
		</main>
	);
};

export default Application;
