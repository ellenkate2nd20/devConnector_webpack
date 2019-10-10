import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeFollow } from '../../actions/profileActions';

const FollowingItem = 
({
	removeFollow,
	profile :
	{
		user: 
		{
			id: userID,
			name, 
			avatar 
		}
	}
}) =>
{
	return (
		<div className="card card-body bg-light mb-3">
			<div className="row">
				<div className="col-2">
					<img src={avatar} alt="" className="rounded-circle"/>
				</div>

				<div className="col-lg-6 col-md-4 col-8">
					<h3>{name}</h3>

					<Link to={`/profile/${userID}`} className="btn btn-info mr-3">
						View Profile
					</Link>
					
					<button 
						type="button"
						className="btn btn-danger"
						onClick={() => removeFollow(userID)}>
						<i className="fas fa-times" />
					</button>
				</div>
			</div>
		</div>
	)
}

FollowingItem.propTypes = 
{
	removeFollow: PropTypes.func.isRequired
};

const mapDispatchToProps = 
{
	removeFollow
}

export default connect(null, mapDispatchToProps)(FollowingItem);