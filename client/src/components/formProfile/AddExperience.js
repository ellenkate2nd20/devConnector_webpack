import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addExperience } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import CheckBoxGroup from '../common/CheckBoxGroup';

const AddExperience = (
{
	addExperience,
	errors,
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
		addExperience(formData, history);
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

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<Link to="/dashboard" className="btn btn-light">
							Go Back
						</Link>

						<h1 className="display-4 text-center">
							Add Experience
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
					</div>
				</div>
			</div>
		</Fragment>
	)
};

AddExperience.propTypes = 
{
	addExperience: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	errors: state.errors
});

const mapDispatchToProps = 
{
	addExperience
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience));