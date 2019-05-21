import React, { useState, useEffect } from 'react';
import { collectPosts } from '../utils';
import { firestore } from '../firebase';
import Posts from './Posts';

const Application = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
			const storedPosts = snapshot.docs.map(collectPosts);

			setPosts(storedPosts);

			return () => {
				unsubscribe();
			};
		});
	}, []);

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Posts posts={posts} />
		</main>
	);
};

export default Application;
