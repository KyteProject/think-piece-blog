import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { PostsProvider } from './providers/PostsProvider';
import { UserProvider } from './providers/UserProvider';
import Application from './components/Application';
<<<<<<< HEAD
import './styles/app.scss';
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
>>>>>>> 45d3412f5fb5930133d9fe131030eabf283aa85e

render(
	<Router>
		<UserProvider>
			<PostsProvider>
				<Application />
			</PostsProvider>
		</UserProvider>
	</Router>,
	document.getElementById( 'root' )
);
