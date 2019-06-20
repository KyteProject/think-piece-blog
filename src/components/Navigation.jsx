import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Navigation = () => {
	return (
		<nav className="navbar">
			<div className="navbar-header">
				<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar">
					<span className="icon-bar" />
					<span className="icon-bar" />
					<span className="icon-bar" />
				</button>
			</div>

			{/* <NavItem>
				<NavLink href="#">Home</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="#">Home</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="#">Home</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href="#">Home</NavLink>
			</NavItem> */}
		</nav>
	);
};

export default Navigation;
