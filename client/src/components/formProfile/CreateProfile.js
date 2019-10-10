import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../server/src/validation/isEmpty';

import { createProfile } from '../../actions/profileActions';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

const CreateProfile = 
({
	createProfile,
	errors,
	history
}) =>
{
	const [formData, setFormData] = useState(
	{
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubUsername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: ''
	});
	
	// seperate this coz relating to previous state
	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	const 
	{
		handle,
		company,
		website,
		location,
		status,
		skills,
		githubUsername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram
	} = formData;

	const onChange = e =>
	{
		setFormData(
		{
			...formData,
			[e.target.name]: e.target.value  
		});
	}

	const onSubmit = e =>
	{
		e.preventDefault();
		createProfile(formData, history);
	}

	const socialInputs = 
		<Fragment>
			<InputGroup
				placeholder="Twitter Profile URL"
				name="twitter"
				icon="fab fa-twitter"
				value={twitter}
				onChange={onChange}
				error={errors.twitter} />

			<InputGroup
				placeholder="Facebook Page URL"
				name="facebook"
				icon="fab fa-facebook"
				value={facebook}
				onChange={onChange}
				error={errors.facebook} />

			<InputGroup
				placeholder="Linkedin Profile URL"
				name="linkedin"
				icon="fab fa-linkedin"
				value={linkedin}
				onChange={onChange}
				error={errors.linkedin} />

			<InputGroup
				placeholder="YouTube Channel URL"
				name="youtube"
				icon="fab fa-youtube"
				value={youtube}
				onChange={onChange}
				error={errors.youtube} />

			<InputGroup
				placeholder="Instagram Page URL"
				name="instagram"
				icon="fab fa-instagram"
				value={instagram}
				onChange={onChange}
				error={errors.instagram} />
		</Fragment>

	const options = 
	[
		{ label: '* Select Professional Status', value: 0 },
		{ label: 'Developer', value: 'Developer' },
		{ label: 'Junior Developer', value: 'Junior Developer' },
		{ label: 'Senior Developer', value: 'Senior Developer' },
		{ label: 'Manager', value: 'Manager' },
		{ label: 'Student or Learning', value: 'Student or Learning' },
		{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
		{ label: 'Intern', value: 'Intern' },
		{ label: 'Other', value: 'Other' }
	];

	const profileContent =
		<Fragment>
			<h1 className="display-4 text-center">
				Create Your Profile
			</h1>

			<p className="lead text-center">
				Let's get some information to make your profile stand out
			</p>

			<small className="d-block pb-3">
				* = required fields
			</small>

			<form onSubmit={onSubmit}>
				<TextFieldGroup
					placeholder="* Profile Handle"
					name="handle"
					value={handle}
					onChange={onChange}
					error={errors.handle}
					info="A unique handle for your profile URL.
						Your full name, company name, nickname" />

				<SelectListGroup
					placeholder="Status"
					name="status"
					value={status}
					onChange={onChange}
					options={options}
					error={errors.status}
					info="Give us an idea of where you are at in your career" />

				<TextFieldGroup
					placeholder="Company"
					name="company"
					value={company}
					onChange={onChange}
					error={errors.company}
					info="Could be your own company or one you work for" />

				<TextFieldGroup
					placeholder="Website"
					name="website"
					value={website}
					onChange={onChange}
					error={errors.website}
					info="Could be your own website or a company one" />

				<TextFieldGroup
					placeholder="Location"
					name="location"
					value={location}
					onChange={onChange}
					error={errors.location}
					info="City or city & state suggested (eg. Boston, MA)" />

				<TextFieldGroup
					placeholder="* Skills"
					name="skills"
					value={skills}
					onChange={onChange}
					error={errors.skills}
					info="Please use comma separated values (eg.
						HTML,CSS,JavaScript,PHP" />

				<TextFieldGroup
					placeholder="Github Username"
					name="githubUsername"
					value={githubUsername}
					onChange={onChange}
					error={errors.githubUsername}
					info="If you want your latest repos and a Github link, 
						include your username" />

				<TextAreaFieldGroup
					placeholder="Short Bio"
					name="bio"
					value={bio}
					onChange={onChange}
					error={errors.bio}
					info="Tell us a little about yourself" />

				<div className="mb-3">
					<button
						type="button"
						onClick = {() => toggleSocialInputs(!displaySocialInputs)}
						className="btn btn-light">
						Add Social Network Links
					</button>

					<span className="text-muted">Optional</span>
				</div>

				{displaySocialInputs && socialInputs}
				
				<input 
					type="submit" 
					value="Submit" 
					className="btn btn-info btn-block mt-4" />
			</form>
		</Fragment>

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						{ profileContent }
					</div>
				</div>
			</div>
		</Fragment>
	)
};

CreateProfile.propTypes = 
{
	createProfile: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	errors: state.errors
});

const mapDispatchToProps = 
{
	createProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile));