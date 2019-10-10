import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../server/src/validation/isEmpty';

import { getPost } from '../../actions/postActions';
import Spinner from '../layout/Spinner';

import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Pagination from '../pagination/Pagination';

const Post = 
({
	getPost,
	post: { post, loading },
	errors,
	match
}) =>
{
	useEffect(() =>
	{
		getPost(match.params.id);
	}, []);
	
	let postContent;
	let commentContent;

	if(errors.nopost)
	{
		postContent = <h4>No post found...</h4>;
	}
	else
	{
		if(isEmpty(post) || loading)
		{
			postContent = <Spinner />;
		}
		else 
		{
			if(!isEmpty(post.comment))
			{
				commentContent = 
					<Fragment>
						<Pagination
							itemsPerPage = {4}
							offside = {2}
							items = {post.comment}
							type = {'comments'}
							postID = {post.id} />
					</Fragment>
			}
			else
			{
				commentContent = <h4>No comments found...</h4>;
			}

			postContent =
				<Fragment>
					<PostItem post={post} showActions={false} />

					<CommentForm postID={post.id} />

					{ commentContent }
				</Fragment>
		}
	}

	return (
		<Fragment>
			<Link to="/posts" className="btn btn-light mb-3">
				Back To Posts
			</Link>

			{postContent}
		</Fragment>
	)
}

Post.propTypes = 
{
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	post: state.post,
	errors: state.errors
})

const mapDispatchToProps = 
{
	getPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);