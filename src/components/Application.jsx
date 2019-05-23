import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Posts from './Posts';
import Authentication from './Authentication';
import UserProfile from './UserProfile';

const Application = () => {
	return (
		<main className="Application">
			<Link to="/">
				<h1>Think Piece</h1>
			</Link>
			<Authentication />
			<Switch>
				<Route exact path="/" component={Posts} />
				<Route exact path="/profile" component={UserProfile} />
			</Switch>
		</main>
	);
};

export default Application;
