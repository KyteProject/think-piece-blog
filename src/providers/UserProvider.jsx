import React, { useState, useEffect, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

const UserContext = createContext([{}, () => {}]);

const UserProvider = props => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribeAuth = auth.onAuthStateChanged(async userAuth => {
			const user = await createUserProfileDocument(userAuth);

			await setUser(user);
		});

		return () => {
			unsubscribeAuth();
		};
	}, []);

	return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
