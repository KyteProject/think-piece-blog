import React, { useState, useEffect } from 'react';
import { collectPosts } from '../utils';
import { firestore } from '../firebase';
import Posts from './Posts';

const Application = () => {
	const [posts, setPosts] = useState([]);

	const handleCreate = async post => {
		const docRef = await firestore.collection('posts').add(post),
			doc = await docRef.get(),
			newPost = collectPosts(doc);

		setPosts([newPost, ...posts]);
	};

	const handleRemove = async id => {
		// const newPosts = posts.filter(p => p.id !== id);

		await firestore.doc(`posts/${id}`).delete();

		setPosts(posts.filter(p => p.id !== id));
	};

	useEffect(() => {
		const unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
			const storedPosts = snapshot.docs.map(collectPosts);

			setPosts(storedPosts);

			return () => {
				unsubscribe();
			};
		});

		// const getPosts = async () => {
		// 	const snapshot = await firestore.collection('posts').get();

		// 	const posts = snapshot.docs.map(collectPosts);

		// 	setPosts(posts);
		// };

		// getPosts();
	}, []);

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Posts posts={posts} onCreate={handleCreate} onRemove={handleRemove} />
		</main>
	);
};

export default Application;
