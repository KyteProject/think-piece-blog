import React, { useState } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

const SignUp = () => {
	const [ values, setValues ] = useState( {} );

	const handleChange = ( event ) => {
		event.persist();

		setValues( () => ( { ...values, [ event.target.name ]: event.target.value } ) );
	};

	const handleSubmit = async( event ) => {
		event.preventDefault();

		const { displayName, email, password } = values;

		try {
			const user = await auth.createUserWithEmailAndPassword( email, password );

			createUserProfileDocument( user.user, { displayName } );
		} catch ( err ) {
			console.error( err );
		}

		setValues( { displayName: '', email: '', password: '' } );
	};

	return (
		<form className="SignUp" onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			<input
				type="text"
				name="displayName"
				placeholder="Display Name"
				value={values.displayName}
				onChange={handleChange}
			/>
			<input
				type="email"
				name="email"
				placeholder="Email"
				value={values.email}
				onChange={handleChange}
				autoComplete="current-email"
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				value={values.password}
				onChange={handleChange}
				autoComplete="current-password"
			/>
			<input type="submit" value="Sign Up" />
		</form>
	);
};

export default SignUp;
