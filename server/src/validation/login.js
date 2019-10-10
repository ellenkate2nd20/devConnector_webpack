const validator = require('validator');
const isEmpty = require('./isEmpty')

module.exports = function validateLoginInput(data)
{
	let errors = {};

	data.email    = !isEmpty(data.email)    ? data.email    : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	
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

	return {
		errors,
		isValid: isEmpty(errors)
	}
}