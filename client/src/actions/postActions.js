import axios from 'axios';

import { getErrors, clearErrors } from './errorActions';

import 
{ 
	GET_POST,
	GET_POSTS
} from './types';

// add post
export const addPost = postData => async dispatch =>
{
	try
	{
		await axios.post(`/posts`, postData);
		dispatch(getPosts());
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
	
};

// get posts
export const getPosts = () => async dispatch =>
{
	try
	{
		const res = await axios.get(`/posts/user`);
		dispatch(
		{
			type: GET_POSTS,
			payload: res.data
		});
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// get post
export const getPost = id => async dispatch =>
{
	try
	{
		const res = await axios.get(`/posts/id/${id}`);
		dispatch(
		{
			type: GET_POST,
			payload: res.data
		});
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// delete post
export const deletePost = id => async dispatch =>
{
	try
	{
		await axios.delete(`/posts/${id}`);
		dispatch(getPosts());
		// dispatch(showAlert('DONE', 'Delete post successfully'));
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// add like
export const addLike = id => async dispatch =>
{
	try
	{
		await axios.post(`/posts/like/${id}`);
		dispatch(getPosts());
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// remove like
export const removeLike = id => async dispatch =>
{
	try
	{
		await axios.post(`/posts/unlike/${id}`);
		dispatch(getPosts());
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// add comment
export const addComment = (id, commentData) => async dispatch =>
{
	try
	{
		await axios.post(`/posts/comment/${id}`, commentData);
		dispatch(getPost(id));
		// dispatch(showAlert('DONE', 'Add comment successfully'));
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};

// delete comment
export const deleteComment = (postID, commentID) => async dispatch =>
{
	try
	{
		await axios.delete(`/posts/comment/${postID}/${commentID}`);
		dispatch(getPost(postID));
		// dispatch(showAlert('DONE', 'Delete comment successfully'));
		dispatch(clearErrors());
	}
	catch(err)
	{
		dispatch(getErrors(err));
	}
};