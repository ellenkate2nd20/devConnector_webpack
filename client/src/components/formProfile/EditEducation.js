import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../server/src/validation/isEmpty';

import { addEducation, getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../layout/Spinner';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import CheckBoxGroup from '../common/CheckBoxGroup';

const EditEducation = (
{
	addEducation,
	getCurrentProfile,
	profile: { profile, loading },
	errors,
	match,
	history
}) =>
{
	const [formData, setFormData] = useState(
	{
		school: '',
		degree: '',
		fieldOfStudy: '',
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

			const education = profile.education.filter(edu => 
			{
				return edu.id === match.params.edu_id
			})[0];

			setFormData(
			{
				school: !education.school ? '' : education.school,
				degree: !education.degree ? '' : education.degree,
				fieldOfStudy: !education.fieldOfStudy ? '' : education.fieldOfStudy,
				from: !education.from ? '' : education.from,
				to: !education.to ? '' : education.to,
				current: education.current,
				description: !education.description ? '' : education.description
			});

			toggleDisabled(education.current);

			console.clear();
		}

		runEffect();
	}, [loading]);

	const 
	{
		school,
		degree,
		fieldOfStudy,
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
		addEducation(formData, history, match.params.edu_id);
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

	let eduContent;

	if(isEmpty(profile) || loading)
	{
		eduContent = <Spinner />;
	}
	else 
	{
		eduContent = 
			<Fragment>
				<Link to="/dashboard" className="btn btn-light">
					Go Back
				</Link>

				<h1 className="display-4 text-center">
					Edit Your Education
				</h1>

				<p className="lead text-center">
					Add any school, bootscamp, etc that you have attended
				</p>

				<small className="d-block pb-3">
					* = required fields
				</small>

				<form onSubmit={onSubmit}>
					<TextFieldGroup 
						placeholder="* School"
						name="school"
						value={school}
						onChange={onChange}
						error={errors.school} />

					<TextFieldGroup 
						placeholder="* Degree Of Certification"
						name="degree"
						value={degree}
						onChange={onChange}
						error={errors.degree} />

					<TextFieldGroup 
						placeholder="* Field Of Study"
						name="fieldOfStudy"
						value={fieldOfStudy}
						onChange={onChange}
						error={errors.fieldOfStudy} />
					
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
						placeholder="Program Description"
						name="description"
						value={description}
						onChange={onChange}
						error={errors.description}
						info="Tell us about the program that you were in" />

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
						{ eduContent }
					</div>
				</div>
			</div>
		</Fragment>
	)
}

EditEducation.propTypes = 
{
	addEducation: PropTypes.func.isRequired,
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
	addEducation,
	getCurrentProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditEducation));