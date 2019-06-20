import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Posts from './Posts';
import Authentication from './Authentication';
import UserProfile from './UserProfile';
import PostPage from './PostPage';
<<<<<<< HEAD
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
=======
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
>>>>>>> 45d3412f5fb5930133d9fe131030eabf283aa85e
	);
};

export default Application;
