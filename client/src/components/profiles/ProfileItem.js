import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../server/src/validation/isEmpty';

import { getCurrentProfile, addFollow, removeFollow } from '../../actions/profileActions';

const ProfileItem = 
({
	getCurrentProfile,
	addFollow,
	removeFollow,
	auth:
	{
		isAuthenticated,
		user: { id: authID }
	},
	profile :
	{
		user: { id: userID, name, avatar },
		status,
		company,
		location,
		skills
	},
	following = []
}) =>
{
	return (
		<div className="profile-item card card-body bg-light mb-3">
			<div className="row">
				<div className="col-2">
					<img src={avatar} alt="" className="rounded-circle"/>
				</div>

				<div className="col-lg-6 col-md-4 col-8">
					<h3>{name}</h3>

					<p>
						{status}
						{isEmpty(company) ? null : (<span> at {company}</span>)}
					</p>

					<p>
						{isEmpty(location) ? null : (<span>{location}</span>)}
					</p>

					<Link to={`/profile/${userID}`} className="btn btn-info mb-1">
						View Profile
					</Link>

					<br />
					
					{ !(authID === userID) && isAuthenticated && ( following.includes(userID) ?
						(<button 
							type="button" 
							className="btn btn-info"
							onClick={() => removeFollow(userID)}>
							<i className="fas fa-wifi text-light" /> Unfollow
						</button>) :
						(<button 
							type="button" 
							className="btn btn-info"
							onClick={() => addFollow(userID)}>
							Follow
						</button>) )}
				</div>

				<div className="col-md-4 d-none d-md-block">	
					<h4>Skill Set</h4>

					<ul className="list-group">
						{skills.slice(0, 4).map((skill, index) =>
						(
							<li className="list-group-item" key={index}>
								<i className="fa fa-check pr-1" />
								{ skill }
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

ProfileItem.propTypes = 
{
	getCurrentProfile: PropTypes.func.isRequired,
	addFollow: PropTypes.func.isRequired,
	removeFollow: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = state =>
({
	auth: state.auth,
	loading: state.profile.loading
});

const mapDispatchToProps = 
{
	getCurrentProfile,
	addFollow,
	removeFollow
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);