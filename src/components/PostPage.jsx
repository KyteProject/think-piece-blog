import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { collectPosts } from './../utils';

const PostPage = ( props ) => {
	const [ post, setPost ] = useState( null ),
		[ comments, setComments ] = useState( [] ),
		postId = props.match.params.id,
		postRef = firestore.doc( `posts/${postId}` ),
		commentsRef = postRef.collection( 'comments' );

	useEffect( () => {
		const unsubscribePost = postRef.onSnapshot( ( snapshot ) => {
			const fetchedPost = collectPosts( snapshot );

			setPost( fetchedPost );
		} );

		const unsubscribeComments = commentsRef.onSnapshot( ( snapshot ) => {
			const fetchedComments = snapshot.docs.map( collectPosts );

			setComments( { fetchedComments } );
		} );

		return () => {
			unsubscribePost();
			unsubscribeComments();
		};
	}, [] );

	return (
		<section>
			{post && <Post {...post} />}
			{post && <Comments comments={comments} postId={post.id} onCreate="" />}
		</section>
	);
};

export default withRouter( PostPage );
