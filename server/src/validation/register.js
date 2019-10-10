const validator = require('validator');
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput(data)
{
	let errors = {};

	data.name      = !isEmpty(data.name)      ? data.name      : '';
	data.email     = !isEmpty(data.email)     ? data.email     : '';
	data.password  = !isEmpty(data.password)  ? data.password  : '';
	data.password2 = !isEmpty(data.password2) ? data.password2 : '';

	// name
	if(!validator.isLength(data.name, {min: 5, max: 15}))
	{
		errors.name = 'Name must be between 5 and 15 character';
	}
	
	if(validator.isEmpty(data.name))
	{
		errors.name = 'Name field is required';
	}

	// email
	if(!validator.isEmail(data.email))
	{
		errors.email = 'Email is invalid';
	}

	if(validator.isEmpty(data.email))
	{
		errors.email = 'Email field is required';
	}
	
	// password
	if(!validator.isLength(data.password, {min: 6, max: 20}))
	{
		errors.password = 'Password must be between 6 and 20 character';
	}

	if(validator.isEmpty(data.password))
	{
		errors.password = 'Password field is required';
	}
 
	// confirm password
	if(!validator.equals(data.password, data.password2))
	{
		errors.password2 = 'Passwords must match';
	}

	if(validator.isEmpty(data.password2))
	{
		errors.password2 = 'Confirm password field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}