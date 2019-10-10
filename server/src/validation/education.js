const validator = require('validator');
const isEmpty = require('./isEmpty')

const validateEducationInput = data =>
{
	let errors = {};

	data.school       = !isEmpty(data.school)       ? data.school       : '';
	data.degree       = !isEmpty(data.degree)       ? data.degree       : '';
	data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
	data.from         = !isEmpty(data.from)         ? data.from         : '';
	data.to           = !isEmpty(data.to)           ? data.to           : '';
	
	// school
	if(validator.isEmpty(data.school))
	{
		errors.school = 'School field is required';
	}
	
	// degree
	if(validator.isEmpty(data.degree))
	{
		errors.degree = 'Degree field is required';
	}

	// field of study
	if(validator.isEmpty(data.fieldOfStudy))
	{
		errors.fieldOfStudy = 'Field of study is required';
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

module.exports = validateEducationInput;