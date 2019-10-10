import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const Login = 
({
	loginUser, 
	isAuthenticated, 
	errors 
}) =>
{
	const [formData, setFormData] = useState(
	{
		email: '',
		password: ''
	});

	const { email, password } = formData;

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
		loginUser(formData);
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
						<h1 className="display-4 text-center">Login</h1>

						<p className="lead text-center">Sign In To Your DevConnector Account</p>

						<form noValidate onSubmit={onSubmit}>
							<TextFieldGroup 
								name="email"
								placeholder="Email Address"
								value={email} 
								error={errors.email}
								type="email"
								onChange={onChange} />

							<TextFieldGroup 
								name="password"
								placeholder="Password"
								value={password} 
								error={errors.password}
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

Login.propTypes = 
{
	loginUser: PropTypes.func.isRequired,
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
	loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);