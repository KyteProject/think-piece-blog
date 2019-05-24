import React, { useState, useEffect, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

const UserContext = createContext( [ {}, () => {} ] );

const UserProvider = ( props ) => {
	const [ user, setUser ] = useState( null );

	useEffect( () => {
		const unsubscribeAuth = auth.onAuthStateChanged( async( userAuth ) => {
			const userRef = await createUserProfileDocument( userAuth );

			if ( !userRef ) {
 return setUser( null );
}

			userRef.onSnapshot( ( snapshot ) => {
				return setUser( { uid: snapshot.id, ...snapshot.data() } );
			} );

			const snapshot = await userRef.get();

			setUser( { uid: snapshot.id, ...snapshot.data() } );
		} );

		return () => {
			unsubscribeAuth();
		};
	}, [] );

	return <UserContext.Provider value={[ user, setUser ]}>{props.children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
