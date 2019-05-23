import React, { useState, useContext } from 'react';
import { firestore } from '../firebase';
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
			displayName = values.displayName;

		if (values.displayName) {
			userRef.update({ displayName });
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
