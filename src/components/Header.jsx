import React from 'react';
import Navigation from './Navigation';

const Header = () => {
	return (
		<header>
			<div className="logo text-center">
				<h1>
					<img src="logo.png" alt="Logo" />
				</h1>
			</div>
			<div className="menu text-center">
				<Navigation />
			</div>
		</header>
	);
};

export default Header;
