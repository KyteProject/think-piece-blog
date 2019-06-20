import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Posts from './Posts';
import Authentication from './Authentication';
import UserProfile from './UserProfile';
import PostPage from './PostPage';
import Header from './Header';

const Application = () => {
	return (
		<main className="container body-wrapper">
			<Header />
			<Authentication />
			<Switch>
				<Route exact path="/" component={Posts} />
				<Route exact path="/profile" component={UserProfile} />
				<Route exact path="/posts/:id" component={PostPage} />
			</Switch>
		</main>
	);
};

export default Application;
