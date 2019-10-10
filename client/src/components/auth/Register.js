import React, { Fragment, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const Register = 
({
	registerUser, 
	isAuthenticated,
	errors,
	history
}) =>
{
	const [formData, setFormData] = useState(
	{
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

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
		registerUser(formData, history);
	}

	if(isAuthenticated)
	{
		return <Redirect to='/dashboard' />;
	}

	return (
		<div className="register">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Sign Up</h1>

						<p className="lead text-center">Create Your DevConnector Account</p>

						<form noValidate onSubmit={onSubmit}>
							<TextFieldGroup 
								name="name"
								placeholder="Name"
								value={name} 
								error={errors.name}
								type="text"
								onChange={onChange} />

							<TextFieldGroup 
								name="email"
								placeholder="Email Address"
								value={email} 
								error={errors.email}
								info="This site uses Gravatar
									so if you want a profile picture, use a Gravatar email"
								type="email"
								onChange={onChange} />

							<TextFieldGroup 
								name="password"
								placeholder="Password"
								value={password} 
								error={errors.password}
								type="password"
								onChange={onChange} />

							<TextFieldGroup 
								name="password2"
								placeholder="Confirm Password"
								value={password2} 
								error={errors.password2}
								type="password"
								onChange={onChange} />

							<input 
								type="submit"
								value="Submit" 
								className="btn btn-info btn-block mt-4"/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

Register.propTypes = 
{
	registerUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	isAuthenticated: state.auth.isAuthenticated,
	errors: state.errors
});

const mapDispatchToProps =
{
	registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));