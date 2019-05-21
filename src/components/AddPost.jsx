import React, { useState } from 'react';
import { firestore, auth } from '../firebase';

const AddPost = () => {
	const [values, setValues] = useState({});

	const handleChange = event => {
		event.persist();

		setValues(values => ({ ...values, [event.target.name]: event.target.value }));
	};

	const handleSubmit = event => {
		event.preventDefault();

		const { uid, displayName, email, photoURL } = auth.currentUser,
			post = {
				title: values.title,
				content: values.content,
				user: {
					uid,
					displayName,
					email,
					photoURL,
				},
				favorites: 0,
				comments: 0,
				createdAt: new Date(),
			};

		firestore.collection('posts').add(post);

		setValues({ title: '', content: '' });
	};

	return (
		<form onSubmit={handleSubmit} className="AddPost">
			<input type="text" name="title" placeholder="Title" value={values.title} onChange={handleChange} />
			<input type="text" name="content" placeholder="Body" value={values.content} onChange={handleChange} />
			<input className="create" type="submit" value="Create Post" />
		</form>
	);
};

export default AddPost;
