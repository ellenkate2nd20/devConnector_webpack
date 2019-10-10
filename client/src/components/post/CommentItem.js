import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { deleteComment } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

const CommentItem = 
({
	deleteComment,
	postID,
	comment:
	{
		id: commentID,
		text,
		user: { name, avatar, id: userID },
		date
	},
	authID
}) =>
{
	return (
		<div className="card card-body mb-3">
			<div className="row">
				<div className="col-md-2">
					<Link to={`/profile/${userID}`}>
						<img 
							src={avatar} 
							alt="comment" 
							className="rounded-circle d-none d-md-block"/>
					</Link>

					<p className="text-center">{name}</p>
				</div>

				<div className="col-md-10">
					<p className="lead">{text}</p>

					<small className="d-block pb-3">
						Posted on <Moment format='YYYY/MM/DD HH:mm'>{date}</Moment>
					</small>

					{userID === authID && (
						<button 
							className="btn btn-danger mr-1"
							type="button"
							onClick={() => deleteComment(postID, commentID)}>
							<i className="fas fa-times" />
						</button>)}
				</div>
			</div>
		</div>
	)
}

CommentItem.propTypes = 
{
	deleteComment: PropTypes.func.isRequired,
	authID: PropTypes.string.isRequired
};

const mapStateToProps = state =>
({
	authID: state.auth.user.id
});

const mapDispatchToProps = 
{
	deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);

