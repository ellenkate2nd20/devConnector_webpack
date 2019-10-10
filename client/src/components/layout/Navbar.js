import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

const Navbar =
({
	logoutUser,
	clearCurrentProfile,
	auth: { isAuthenticated, user }
}) =>
{
	const onLogout = e =>
	{
		e.preventDefault();
		clearCurrentProfile();
		logoutUser();
	};

	const authLinks = 
	(
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link to="/posts" className="nav-link">Post Feed</Link>
			</li>

			<li className="nav-item">
				<Link to="/following" className="nav-link">Following</Link>
			</li>

			<li className="nav-item">
				<Link to="/dashboard" className="nav-link">Dashboard</Link>
			</li>

			<li className="nav-item">
				<a href="" onClick={onLogout} className="nav-link">
					<img 
						src={user.avatar}
						alt={user.name} 
						className="rounded-circle"
						style={{width: '25px', marginRight: '5px'}} />
					Logout
				</a>
			</li>
		</ul>
	);

	const guessLinks =
	(
		<ul className="navbar-nav ml-auto">
			<li className="nav-item">
				<Link to="/register" className="nav-link">Sign Up</Link>
			</li>

			<li className="nav-item">
				<Link to="/login" className="nav-link">Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
			<div className="container">
				<Link to="/" className="navbar-brand">DevConnector</Link>

				<button className="navbar-toggler" type="button"
					data-toggle="collapse" data-target="#mobile-nav">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="mobile-nav">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to="/profiles" className="nav-link">Developers</Link>
						</li>
					</ul>

					{isAuthenticated ? authLinks : guessLinks}
				</div>
			</div>
		</nav>
	)
}

Navbar.propTypes = 
{
	logoutUser: PropTypes.func.isRequired,
	clearCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state =>
({
	auth: state.auth,
});

const mapDispatchToProps =
{
	logoutUser,
	clearCurrentProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);