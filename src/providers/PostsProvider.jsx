import React, { useState, useEffect, createContext } from 'react';
import { collectPosts } from '../utils';
import { firestore } from '../firebase';

const PostsContext = createContext( [ {}, () => {} ] );

const PostsProvider = ( props ) => {
	const [ posts, setPosts ] = useState( [] );

	useEffect( () => {
		const unsubscribePosts = firestore
			.collection( 'posts' )
			.onSnapshot( ( snapshot ) => setPosts( snapshot.docs.map( collectPosts ) ) );

		return () => {
			unsubscribePosts();
		};
	}, [] );

	return <PostsContext.Provider value={[ posts, setPosts ]}>{props.children}</PostsContext.Provider>;
};

export { PostsContext, PostsProvider };
