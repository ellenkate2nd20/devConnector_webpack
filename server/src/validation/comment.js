const validator = require('validator');
const isEmpty = require('./isEmpty')

module.exports = function validateCommentInput(data)
{
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';
	
	// comment
	if(validator.isEmpty(data.text))
	{
		errors.text = 'Text field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}