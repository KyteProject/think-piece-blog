import React from 'react';
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
	);
};

export default Navigation;
