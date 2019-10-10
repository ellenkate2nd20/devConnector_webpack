import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addComment } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

const CommentForm = 
({
	addComment,
	postID,
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

	const onSubmit = async e =>
	{
		e.preventDefault();
		addComment(postID, formData);
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
					Leave a comment
				</div>

				<div className="card-body">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<TextAreaFieldGroup
								placeholder="Reply to post"
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

CommentForm.propTypes = 
{
	addComment: PropTypes.func.isRequired,
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
	addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);