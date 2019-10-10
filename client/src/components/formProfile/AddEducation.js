import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addEducation } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import CheckBoxGroup from '../common/CheckBoxGroup';

const AddEducation = (
{
	addEducation,
	errors,
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
		addEducation(formData, history);
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
							Add Education
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
					</div>
				</div>
			</div>
		</Fragment>
	)
}

AddEducation.propTypes = 
{
	addEducation: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	errors: state.errors
});

const mapDispatchToProps = 
{
	addEducation
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation));