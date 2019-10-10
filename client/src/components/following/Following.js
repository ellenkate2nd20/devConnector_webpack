import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../server/src/validation/isEmpty';

import { getCurrentProfile, getProfiles } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Spinner from '../layout/Spinner';
import FollowingItem from './FollowingItem';

const Following = 
({
	getCurrentProfile,
	getProfiles,
	profile: 
	{
		profile: { following }, 
		profiles, 
		loading 
	}
}) =>
{
	useEffect(() =>
	{
		const runEffect = async () =>
		{
			await getCurrentProfile();
			await getProfiles();
		}

		runEffect();
	}, []);

	const [name, setName] = useState('');

	const onChange = e =>
	{
		setName(e.target.value);
	}

	let followingItems;

	if(loading)
	{
		followingItems = <Spinner />;
	}
	else 
	{
		if(!isEmpty(profiles))
		{
			const followingProfiles = profiles.filter(profile => 
					following.includes(profile.user.id));

			let sortedProfles

			if(name.length > 0)
			{
				sortedProfles = followingProfiles.filter(profile => 
					profile.user.name.toLowerCase().includes(name.toLowerCase()));
			}
			else
			{
				sortedProfles = followingProfiles;
			}

			if(isEmpty(sortedProfles))
			{
				followingItems = <h4>No following found...</h4>;
			}
			else
			{
				followingItems = sortedProfles.map(profile =>
				(
					<FollowingItem key={profile.id} profile={profile} />
				))
			}
		}
		else
		{
			followingItems = <h4>No following found...</h4>;
		}
	}

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<TextFieldGroup
							name="name"
							placeholder="Find Name..."
							value={name} 
							onChange={onChange} />

						{ followingItems }
					</div>
				</div>
			</div>
		</Fragment>
	)
}

Following.propTypes =
{
	getCurrentProfile: PropTypes.func.isRequired,
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	profile: state.profile
})

const mapDispatchToProps = 
{
	getCurrentProfile,
	getProfiles
}

export default connect(mapStateToProps, mapDispatchToProps)(Following);

