import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../server/src/validation/isEmpty';

import { getProfileByID } from '../../actions/profileActions';
import Spinner from '../layout/Spinner';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

const Profile =
({
	getProfileByID,
	profile: { profile, loading },
	errors,
	match
}) =>
{
	useEffect(() =>
	{
		getProfileByID(match.params.id);
	}, []);
	
	let profileContent;

	if(errors.noprofile)
	{
		profileContent = <h4>No profile found...</h4>;
	}
	else
	{
		if(isEmpty(profile) || loading)
		{
			profileContent = <Spinner />;
		}
		else 
		{
			profileContent = 
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 float-left">
								Back To Profiles
							</Link>
						</div>

						<div className="col-md-6" />
					</div>

					<ProfileHeader profile={profile} />
					<ProfileAbout profile={profile} />
					<ProfileCreds profile={profile} />
					{/*{profile.githubUsername ? (<ProfileGithub username = {profile.githubUsername} />) : null}*/}
				</div>
		}
	}

	return (
		<div className="profile">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						{profileContent}
					</div>
				</div>
			</div>
		</div>
	)
}	

Profile.propTypes = 
{
	getProfileByID: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	errors: state.errors,
	profile: state.profile
})

const mapDispatchToProps = 
{
	getProfileByID
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

