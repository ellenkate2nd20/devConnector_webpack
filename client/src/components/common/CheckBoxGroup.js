import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CheckBoxGroup = 
({
	id, 
	name, 
	value, 
	error, 
	type, 
	onChange, 
	checked, 
	text
}) =>
{
	return (
		<div className="form-check mb-4">
			<input 
				type={type} 
				className=
				{
					classnames(
						'form-check-input', 
						{'is-invalid':error})
				}
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				checked={checked} />

			<label htmlFor={id} className="form-check-label">
				{text}
			</label>
			
			{ error && <div className="invalid-feedback">{error}</div> }
		</div>
	)
}

CheckBoxGroup.propTypes = 
{
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	value: PropTypes.bool.isRequired,
	error: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
};

export default CheckBoxGroup;