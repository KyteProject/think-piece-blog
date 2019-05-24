import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { collectPosts } from './../utils';
import { UserContext } from '../providers/UserProvider';

const PostPage = ( props ) => {
	const [ post, setPost ] = useState( null ),
		[ comments, setComments ] = useState( [] ),
		[ user ] = useContext( UserContext ),
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

			setComments( fetchedComments );
		} );

		return () => {
			unsubscribePost();
			unsubscribeComments();
		};
	}, [] );

	const createComment = ( comment ) => {
		commentsRef.add( {
			...comment,
			user
		} );
	};

	return (
		<section>
			{post && <Post {...post} />}
			{post && <Comments comments={comments} postId={post.id} onCreate={createComment} />}
		</section>
	);
};

export default withRouter( PostPage );
