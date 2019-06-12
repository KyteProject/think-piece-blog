import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Posts from './Posts';
import Authentication from './Authentication';
import UserProfile from './UserProfile';
import PostPage from './PostPage';
import Navigation from './Navigation';

const Application = () => {
	return (
		<React.Fragment>
			<Navigation />
			<main className="Application">
				<Link to="/">
					<h1>Think Piece</h1>
				</Link>
				<Authentication />
				<Switch>
					<Route exact path="/" component={Posts} />
					<Route exact path="/profile" component={UserProfile} />
					<Route exact path="/posts/:id" component={PostPage} />
				</Switch>
			</main>
		</React.Fragment>
	);
};

export default Application;
