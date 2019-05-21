import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase';

const SignIn = () => {
	const [values, setValues] = useState({});

	const handleChange = event => {
		event.persist();
		setValues(values => ({ ...values, [event.target.name]: event.target.value }));
	};

	const handleSubmit = event => {
		event.preventDefault();
		setValues({ email: '', password: '' });
	};

	return (
		<form className="SignIn" onSubmit={handleSubmit}>
			<h2>Sign In</h2>
			<input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
			<input
				type="password"
				name="password"
				placeholder="Password"
				value={values.password}
				onChange={handleChange}
			/>
			<input type="submit" value="Sign In" />
			<button onClick={signInWithGoogle}>Sign In With Google</button>
		</form>
	);
};

export default SignIn;
