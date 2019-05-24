import React, { useState } from 'react';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { collectPosts } from './../utils';

const PostPage = () => {
	const [ post, setPost ] = useState( null ),
		[ comments, setComments ] = useState( [] );

	return <div>Post Page</div>;
};

export default PostPage;
