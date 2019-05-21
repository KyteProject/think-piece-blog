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

	useEffect(() => {
		const getPosts = async () => {
			const snapshot = await firestore.collection('posts').get();

			const posts = snapshot.docs.map(collectPosts);

			setPosts(posts);
		};

		getPosts();
	}, []);

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Posts posts={posts} onCreate={handleCreate} />
		</main>
	);
};

export default Application;
