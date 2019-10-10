import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../server/src/validation/isEmpty';

import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../layout/Spinner';

import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = 
({
	getCurrentProfile,
	deleteAccount,
	user,
	profile: { profile, loading }
}) =>
{
	useEffect(() =>
	{
		getCurrentProfile();
	}, []);
	
	let dashboardContent;

	if(loading)
	{
		dashboardContent = <Spinner />;
	}
	else 
	{
		if(!isEmpty(profile))
		{
			dashboardContent =
				<Fragment>
					<p className="lead text-muted">
						Welcome {' '}
						<Link to={`/profile/${profile.handle}`}>
							{ user.name }
						</Link>
					</p>

					<DashboardActions />

					<Experience experience={profile.experience} />

					<div style={{ marginBottom: '40px' }} />

					<Education education={profile.education} />

					<div style={{ marginBottom: '40px' }} />

					<button 
						onClick={() => deleteAccount()} 
						className="btn btn-danger">
						Delete My Account
					</button>
				</Fragment>
		}
		else
		{
			dashboardContent = 
				<Fragment>
					<p className="lead text-muted">Welcome { user.name }</p>

					<p>You have not yet set up a profile, please add some info</p>

					<Link to="/create-profile" className="btn btn-lg btn-info">
						Create Profile
					</Link>
				</Fragment>
		}
	}

	return (
		<div className="dashboard">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1 className="display-4">Dashboard</h1>
						{dashboardContent}
					</div>
				</div>
			</div>
		</div>
	)
}

Dashboard.propTypes = 
{
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	user: state.auth.user,
	profile: state.profile
});

const mapDispatchToProps = 
{
	getCurrentProfile,
	deleteAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);