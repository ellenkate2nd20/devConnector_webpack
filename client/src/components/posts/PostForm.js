import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addPost } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

const PostForm = 
({ 
	addPost,
	user: { name, avatar },
	errors 
}) =>
{
	const [formData, setFormData] = useState(
	{
		text: '',
		name,
		avatar
	});
	
	const { text } = formData;

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
		addPost(formData);
		setFormData(
		{
			...formData,
			text: ''  
		});
	}

	return (
		<div className="post-form mb-3">
			<div className="card card-info">
				<div className="card-header bg-dark text-white">
					Say something...
				</div>

				<div className="card-body">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<TextAreaFieldGroup
								placeholder="Create a post"
								name="text"
								value={text}
								onChange={onChange}
								error={errors.text} />

							<input 
								type="submit" 
								value="Submit" 
								className="btn btn-info" />
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

PostForm.propTypes = 
{
	addPost: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	user: state.auth.user,
	errors: state.errors
});

const mapDispatchToProps = 
{
	addPost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);