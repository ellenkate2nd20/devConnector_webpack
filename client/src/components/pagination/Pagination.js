import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import ProfileItem from '../profiles/ProfileItem';
import PostItem from '../posts/PostItem';
import CommentItem from '../post/CommentItem';

const Pagination = 
({
	// current,
	itemsPerPage,
	offside,
	items = [],
	attach,
	type,
	postID
}) =>
{
	let storageValue;
	let storageName;

	switch(type)
	{
		case 'posts':
			storageValue = localStorage.currentPostPage;
			storageName = 'currentPostPage';
			break;

		case 'profiles':
			storageValue = localStorage.currentProfilePage;
			storageName = 'currentProfilePage';
			break;

		case 'comments':
			storageValue = 0;
			storageName = '';
			break;
	}

	const [formData, setFormData] = useState(
	{
		currentPage: parseInt(storageValue) || 1,
		lastPage: Math.ceil(items.length/itemsPerPage)
	});
	
	// adding more item in full last-page
	useEffect(() =>
	{
		setFormData(
		{
			...formData,
			lastPage: Math.ceil(items.length/itemsPerPage)
		})
	}, [Math.ceil(items.length/itemsPerPage)])

	const 
	{
		currentPage,
		lastPage
	} = formData;

	// incase deleting the last item of last page
	if(currentPage > lastPage)
	{
		setFormData(
		{
			...formData,
			currentPage: lastPage
		});
		localStorage.setItem(storageName, lastPage);
	}
	
	// move from page to page
	const setPage = page =>
	{
		setFormData(
		{
			...formData,
			currentPage: page
		});
		localStorage.setItem(storageName, page);
	}

	const onIncrease = () =>
	{
		setFormData(
		{
			...formData,
			currentPage: currentPage + 1
		});
		localStorage.setItem(storageName, currentPage + 1);
	}

	const onDecrease = () =>
	{
		setFormData(
		{
			...formData,
			currentPage: currentPage - 1
		});
		localStorage.setItem(storageName, currentPage - 1);
	}
	
	// get posts on current page
	const indexOfLastPost = currentPage*itemsPerPage;
	const indexOfFirstPost = indexOfLastPost - itemsPerPage;

	const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);
	
	// set page array
	let firstRange;
	let lastRange;
	let pageArray = [];

	switch(true)
	{
		case currentPage <= 1 + offside:
			firstRange = 1;
			lastRange = 1 + 2*offside;
			break;

		case currentPage >= lastPage - offside:
			firstRange = lastPage - 2*offside;
			lastRange = lastPage;
			break;

		default:
			firstRange = currentPage - offside;
			lastRange = currentPage + offside;
			break;
	}
	
	for(let i = firstRange; i <= lastRange; i++)
	{
		if(i > 0 && i <= lastPage)
			pageArray.push(i);
	}

	return (
		<Fragment>
			<nav className="pagination justify-content-end" style={{alignItems: 'center'}}>
				<ul className="pagination">
					<li className={classnames(
						"page-item", 
						{"disabled": currentPage <= 1})}>
						<a 
							href="#" 
							className="page-link"
							onClick={() => onDecrease()} >
							«
						</a>
					</li>

					{pageArray.map(number =>
					(
						<li className={classnames(
							"page-item", 
							{"disabled": currentPage === number})}
							key={number} >
							<a 
								href="#" 
								className="page-link"
								onClick={() => setPage(number)} >
								{ number }
							</a>
						</li>
					))}
					
					<li className={classnames(
						"page-item",
						{"disabled": currentPage >= lastPage})}>
						<a 
							href="#" 
							className="page-link"
							onClick={() => onIncrease()} >
							»
						</a>
					</li>

					<li className="page-item disabled">
						<a 
							href="#" 
							className="page-link font-weight-bold" >
							{currentPage}/{lastPage}
						</a>
					</li>
				</ul>
			</nav>

			{type === 'posts' && (
				currentItems.map(post =>
				(
					<PostItem key={post.id} post={post} />
				)))}

			{type === 'profiles' && (
				currentItems.map(profile =>
				(
					<ProfileItem key={profile.id} profile={profile} following={attach} />
				)))}

			{type === 'comments' && (
				currentItems.map(comment =>
				(
					<CommentItem key={comment.id} comment={comment} postID={postID} />
				)))}
		</Fragment>	
	)
}

export default Pagination;

