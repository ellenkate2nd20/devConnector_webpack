import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { addLike, removeLike, deletePost } from '../../actions/postActions';

const PostItem = 
({
	addLike,
	removeLike,
	deletePost,
	post:
	{
		id: postID,
		text,
		user: { name, avatar, id: userID },
		like,
		comment,
		date
	},
	authID,
	showActions
}) =>
{
	const alreadyLiked = like =>
	{
		return like.filter(lk => lk.user.id === authID).length > 0
	}

	return (
		<div className="card card-body mb-3">
			<div className="row">
				<div className="col-md-2">
					<Link to={`/profile/${userID}`}>
						<img 
							src={avatar}
							alt="post" 
							className="rounded-circle d-none d-md-block"/>
					</Link>

					<p className="text-center">{name}</p>
				</div>

				<div className="col-md-10">
					<p className="lead">{text}</p>

					<small className="d-block pb-3">
						Posted on <Moment format='YYYY/MM/DD HH:mm'>{date}</Moment>
					</small>
					
					{showActions && (
						<Fragment>
							<button 
								className="btn btn-light mr-1"
								type="button"
								onClick={() => addLike(postID)}>
								<i 
									className=
									{
										classnames('fas fa-thumbs-up text-secondary',
										{'text-info': alreadyLiked(like)})
									}/>

								<span className="badge badge-light">
									{like.length}
								</span>
							</button>

							<button 
								className="btn btn-light mr-1" 
								type="button"
								onClick={() => removeLike(postID)}>
								<i className="text-secondary fas fa-thumbs-down" />
							</button>

							<Link to={`/post/${postID}`} className="btn btn-info mx-1">
								Discuss{' '}
								<span className='comment-count'>{comment.length}</span>
							</Link>

							{userID === authID && (
								<button 
									className="btn btn-danger mr-1"
									type="button"
									onClick={() => deletePost(postID)}>
									<i className="fas fa-times" />
								</button>)}
						</Fragment>
					)}
				</div>
			</div>
		</div>
	)
}

PostItem.defaultProps = 
{
	showActions: true
};

PostItem.propTypes = 
{
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	authID: PropTypes.string.isRequired
};

const mapStateToProps = state =>
({
	authID: state.auth.user.id
})

const mapDispatchToProps = 
{
	addLike,
	removeLike,
	deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);

