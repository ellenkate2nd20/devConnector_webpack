const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateExperienceInput = data =>
{
	let errors = {};

	data.title   = !isEmpty(data.title)   ? data.title   : '';
	data.company = !isEmpty(data.company) ? data.company : '';
	data.from    = !isEmpty(data.from)    ? data.from    : '';
	data.to      = !isEmpty(data.to)      ? data.to      : '';
	
	// title
	if(validator.isEmpty(data.title))
	{
		errors.title = 'Job title field is required';
	}
	
	// company
	if(validator.isEmpty(data.company))
	{
		errors.company = 'Company field is required';
	}

	// from
	if(validator.isEmpty(data.from))
	{
		errors.from = 'From date field is required';
	}
	
	// to
	if(!data.current && data.to < data.from)
	{
		errors.to = 'Invalid to date';
	}

	if(!data.current && validator.isEmpty(data.to))
	{
		errors.to = 'To date field is required';
	}

	// current
	if(data.current && !validator.isEmpty(data.to))
	{
		errors.current = 'You finished your job';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
};

module.exports = validateExperienceInput;