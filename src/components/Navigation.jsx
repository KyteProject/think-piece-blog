import React from 'react';
<<<<<<< HEAD
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<section className="nav-wrapper">
			<Container>
				<Row>
					<Col lg="2" md="12" className="text-left">
						<Link to="/"> Home</Link>
					</Col>
					<Col lg="8" md="12">
						<Nav id="main-menu" className="text-center">
							<NavItem>
								<NavLink href="/">Home</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/">Blog</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/about">About</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/contact">Contact</NavLink>
							</NavItem>
						</Nav>
					</Col>
					<Col lg="2" md="4" className="text-right">
						{/*  */}
					</Col>
				</Row>
			</Container>
		</section>
=======
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
>>>>>>> 45d3412f5fb5930133d9fe131030eabf283aa85e
	);
};

export default Navigation;
