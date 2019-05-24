import React, { useState, useContext } from 'react';
import { firestore, storage } from '../firebase';
import { UserContext } from '../providers/UserProvider';

const UserProfile = () => {
	const [user] = useContext(UserContext),
		[values, setValues] = useState({
			displayName: '',
			imageInput: null,
		});

	const handleChange = event => {
		event.persist();

		setValues(values => ({ ...values, [event.target.name]: event.target.value }));
	};

	const handleSubmit = event => {
		event.preventDefault();

		const userRef = firestore.doc(`users/${user.uid}`),
			displayName = values.displayName,
			file = values.imageInput && values.imageInput.files[0];

		if (values.displayName) {
			userRef.update({ displayName });
		}

		if (file) {
			storage
				.ref()
				.child('user-profiles')
				.child(user.uid)
				.child(file.name)
				.put(file)
				.then(res => res.ref.getDownloadURL())
				.then(photoURL => userRef.update({ photoURL }));
		}
	};

	return (
		<section className="UserProfile">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="displayName"
					value={values.displayName}
					onChange={handleChange}
					placeholder="Display Name"
				/>
				<input type="file" name="imageInput" ref={ref => (values.imageInput = ref)} />
				<input className="update" type="submit" />
			</form>
		</section>
	);
};

export default UserProfile;
