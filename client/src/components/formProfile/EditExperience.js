import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../server/src/validation/isEmpty';

import { addExperience, getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../layout/Spinner';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import CheckBoxGroup from '../common/CheckBoxGroup';

const EditExperience = (
{
	addExperience,
	getCurrentProfile,
	profile: { profile, loading },
	errors,
	match,
	history
}) =>
{
	const [formData, setFormData] = useState(
	{
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});

	const [toDateDisabled, toggleDisabled] = useState(false);
	
	useEffect(() => 
	{
		const runEffect = async () =>
		{
			await getCurrentProfile();

			const experience = profile.experience.filter(exp => 
			{
				return exp.id === match.params.exp_id
			})[0];

			setFormData(
			{
				company: !experience.company ? '' : experience.company,
				title: !experience.title ? '' : experience.title,
				location: !experience.location ? '' : experience.location,
				from: !experience.from ? '' : experience.from,
				to: !experience.to ? '' : experience.to,
				current: experience.current,
				description: !experience.description ? '' : experience.description
			});

			toggleDisabled(experience.current);

			console.clear();
		}

		runEffect();
	}, [loading]);

	const 
	{
		company,
		title,
		location,
		from,
		to,
		current,
		description
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
		addExperience(formData, history, match.params.exp_id);
	}

	const onCheck = () =>
	{
		setFormData(
		{
			...formData,
			current: !current
		});
		toggleDisabled(!toDateDisabled);
	}
	
	let expContent;

	if(isEmpty(profile) || loading)
	{
		expContent = <Spinner />;
	}
	else 
	{
		expContent =
			<Fragment>
				<Link to="/dashboard" className="btn btn-light">
					Go Back
				</Link>

				<h1 className="display-4 text-center">
					Edit Your Experience
				</h1>

				<p className="lead text-center">
					Add any job or position that you have had in the past or current
				</p>

				<small className="d-block pb-3">
					* = required fields
				</small>

				<form onSubmit={onSubmit}>
					<TextFieldGroup 
						placeholder="* Company"
						name="company"
						value={company}
						onChange={onChange}
						error={errors.company} />

					<TextFieldGroup 
						placeholder="* Job Title"
						name="title"
						value={title}
						onChange={onChange}
						error={errors.title} />

					<TextFieldGroup 
						placeholder="Location"
						name="location"
						value={location}
						onChange={onChange}
						error={errors.location} />
					
					<h6>From Date</h6>
					<TextFieldGroup 
						name="from"
						type="date"
						value={from}
						onChange={onChange}
						error={errors.from} />

					<h6>To Date</h6>
					<TextFieldGroup 
						name="to"
						type="date"
						value={to}
						onChange={onChange}
						disabled={toDateDisabled ? 'disabled' : ''}
						error={errors.to} />

					<CheckBoxGroup 
						id="current"
						type="checkbox"
						name="current"
						value={current}
						checked={current}
						onChange={onCheck}
						text="Current Job"
						error={errors.current} />

					<TextAreaFieldGroup
						placeholder="Job Description"
						name="description"
						value={description}
						onChange={onChange}
						error={errors.description}
						info="Tell us about the position" />

					<input 
						type="submit" 
						value="Submit" 
						className="btn btn-info btn-block mt-4"/>
				</form>
			</Fragment>
	}

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						{ expContent }
					</div>
				</div>
			</div>
		</Fragment>
	)

}

EditExperience.propTypes = 
{
	addExperience: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	profile: state.profile,
	errors: state.errors
});

const mapDispatchToProps = 
{
	addExperience,
	getCurrentProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditExperience));


