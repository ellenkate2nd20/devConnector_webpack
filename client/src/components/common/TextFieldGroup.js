import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = 
({
	name,
	type,
	placeholder, 
	value, 
	error, 
	info, 
	onChange, 
	disabled
}) =>
{
	return (
		<div className="form-group">
			<input 
				className=
				{
					classnames('form-control form-control-lg', 
					{'is-invalid':error})
				}
				placeholder={placeholder}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				disabled={disabled} />
			
			{ info && <small className="form-text text-muted">{info}</small> }
			{ error && <div className="invalid-feedback">{error}</div> }
		</div>
	)
}

TextFieldGroup.propTypes = 
{
	type: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string
};

export default TextFieldGroup;