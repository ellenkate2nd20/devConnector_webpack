import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../server/src/validation/isEmpty';

import { getCurrentProfile, getProfiles } from '../../actions/profileActions';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import Pagination from '../pagination/Pagination';

const Profiles = 
({
	getCurrentProfile,
	getProfiles,
	profile: 
	{
		profile: { following },
		profiles, 
		loading 
	},
	isAuthenticated
}) =>
{
	useEffect(() =>
	{
		const runEffect = async () =>
		{
			await getProfiles();

			if(isAuthenticated)
			{
				await getCurrentProfile();
			}
		}

		runEffect();
	}, []);

	let profileItems;

	if(loading)
	{
		profileItems = <Spinner />;
	}
	else 
	{
		if(!isEmpty(profiles))
		{
			profileItems =
				<Fragment>
					<Pagination
						itemsPerPage = {2}
						offside = {1}
						items = {profiles}
						attach = {following}
						type = {'profiles'} />
				</Fragment>
		}
		else
		{
			profileItems = <h4>No profiles found...</h4>;
		}
	}

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1 className="display-4 text-center">Developer Profiles</h1>

						<p className="lead text-center">
							Browse and conenct with developers
						</p>
						
						{profileItems}
					</div>
				</div>
			</div>
		</Fragment>
	)
}

Profiles.propTypes = 
{
	getCurrentProfile: PropTypes.func.isRequired,
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
};


const mapStateToProps = state =>
({
	profile: state.profile,
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = 
{
	getCurrentProfile,
	getProfiles
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);

