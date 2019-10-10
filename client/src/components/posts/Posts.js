import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../../../server/src/validation/isEmpty';

import { getPosts } from '../../actions/postActions';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';
import Pagination from '../pagination/Pagination';

const Posts = 
({
	getPosts,
	post: { posts, loading }
}) =>
{
	useEffect(() =>
	{
		getPosts();
	}, []);

	let postItems;

	if(loading)
	{
		postItems = <Spinner />;
	}
	else 
	{
		if(!isEmpty(posts))
		{
			postItems =
				<Fragment>
					<Pagination
						itemsPerPage = {4}
						offside = {2}
						items = {posts}
						type = {'posts'}/>
				</Fragment>
		}
		else
		{
			postItems = <h4>No posts found...</h4>;
		}
	}

	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<PostForm />

						{ postItems }
					</div>
				</div>
			</div>
		</Fragment>
	)
}

Posts.propTypes = 
{
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state =>
({
	post: state.post
})

const mapDispatchToProps = 
{
	getPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

