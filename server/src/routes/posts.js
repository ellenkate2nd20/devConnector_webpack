const express = require('express');
const router = express.Router();
const passport = require('passport');

// models
const post = require('../models/Post');
const profile = require('../models/Profile');
const user = require('../models/User');

// input validation
const validatePostInput = require('../validation/post');
const validateCommentInput = require('../validation/comment');

// suppporting function
const utils = require('./utils');

const authentication = passport.authenticate('jwt', { session:false });

// @route 	GET api/posts/test
// @desc 	Test posts route
// @access 	Public
router.get('/test', (req, res) => res.json({msg: 'posts works'}));

// @route 	GET api/posts/all
// @desc 	Get all posts
// @access 	Public
router.get('/all', authentication, async (req, res) =>
{
	try
	{
		const errors = {};
		const data = [];

		const postChild = await utils.crudRef('get', post);

		if(!postChild.exists())
		{
			errors.nopost = 'There is no post exists';
			return res.status(404).json(errors);
		}
		else
		{
			postValue = postChild.val();
			
			// type of postValue is object => using var ... in
			for(var key in postValue)
			{
				const postData = postValue[key];
				
				// getting like and comment paralell => using Promise.all
				const [like, comment] = await Promise.all(
				[
					utils.toArray(postData, 'like'),
					utils.toArray(postData, 'comment')
				]);

				const postArray =
				{
					...postData,
					id     : key,					
					like   : like.reverse(),
					comment: comment.reverse()
				}

				data.push(postArray);
			}
		}

		return res.json(data.reverse());
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	GET posts/user
// @desc 	Get post by id 
// @access 	Public
router.get('/user', authentication, async (req, res) => 
{
	try
	{
		const errors = {};
		const data = [];
		
		// get following id
		const profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
							.equalTo(req.user.id));

		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}

		const following = await utils.toArray(Object.values(profileChild.val())[0], 'following');
		following.push(req.user.id);
		
		// get following post
		const postChild = await utils.crudRef('get', post);

		if(!postChild.exists())
		{
			errors.nopost = 'There is no post exists';
			return res.status(404).json(errors);
		}
		else
		{
			postValue = postChild.val();
			
			// type of postValue is object => using var ... in
			for(let key in postValue)
			{
				const postData = postValue[key];

				if(following.includes(postData.user.id))
				{
					// getting like and comment paralell => using Promise.all
					const [like, comment] = await Promise.all(
					[
						utils.toArray(postData, 'like'),
						utils.toArray(postData, 'comment')
					]);

					const postArray =
					{
						...postData,
						id     : key,
						like   : like.reverse(),
						comment: comment.reverse()
					}

					data.push(postArray);
				}
			}
		}

		return res.json(data.reverse());
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	GET api/posts/id/:id
// @desc 	Get post by id 
// @access 	Public
router.get('/id/:post_id', authentication, async (req, res) => 
{
	try
	{
		const errors = {};

		const postChild = await utils.crudRef('get', post.orderByKey()
						.equalTo(req.params.post_id));
		
		if(!postChild.exists())
		{
			errors.nopost = 'There is no post for this user';
			return res.status(404).json(errors);
		}
		else
		{
			postValue = Object.values(postChild.val())[0];

			const [like, comment] = await Promise.all(
			[
				utils.toArray(postValue, 'like'),
				utils.toArray(postValue, 'comment')
			]);

			const data =
			{
				...postValue,
				id     : req.params.post_id,
				like   : like.reverse(),
				comment: comment.reverse()
			};

			return res.status(200).json(data);
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	POST api/posts
// @desc 	Create posts 
// @access 	Private
router.post('/', authentication, async (req, res) =>
{
	try
	{
		const { errors, isValid } = validatePostInput(req.body);

		if(!isValid)
		{
			return res.status(400).json(errors);
		}

		const newPost =
		{
			user:
			{
				id    : req.user.id,
				name  : req.user.name,
				avatar: req.user.avatar,
			},

			text: req.body.text,
			date: new Date().getTime()
		};

		utils.crudRef('post', post, newPost);

		return res.status(200).json(newPost)
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	DELETE api/posts/:id
// @desc 	Delete post by id 
// @access 	Private
router.delete('/:post_id', authentication, async (req, res) => 
{
	try
	{
		const errors = {};

		const postChild = await utils.crudRef('get', post.orderByKey()
							.equalTo(req.params.post_id));
		
		if(!postChild.exists())
		{
			errors.nopost = 'There is no post for this user';
			return res.status(404).json(errors);
		}
		else
		{
			if(Object.values(postChild.val())[0].user.id !== req.user.id)
			{
				errors.unauthorized = 'User not authorized';
				return res.status(401).json(errors);
			}
			else
			{
				utils.deleteComponent(postChild);
				res.status(200).json({ msg: 'Post deleted' });
			}
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	POST api/posts/like/:id
// @desc 	Like post 
// @access 	Private
router.post('/like/:post_id', authentication, async (req, res) => 
{
	try
	{
		const errors = {};

		const postChild = await utils.crudRef('get', post.orderByKey()
							.equalTo(req.params.post_id));
		
		if(!postChild.exists())
		{
			errors.nopost = 'There is no post for this user';
			return res.status(404).json(errors);
		}
		else
		{			
			// get postValue in type of Snapshot for later use
			const postValue = await utils.getChild(postChild);

			// get like by user id == request id
			const like = await utils.crudRef('get', postValue.ref.child('like')
							.orderByChild('user/id').equalTo(req.user.id));

			if(like.exists())
			{
				errors.alreadyliked = `You've already liked this post`;
				return res.status(400).json(errors);
			}
			else
			{
				const newLike =
				{
					user:
					{
						id    : req.user.id,
						name  : req.user.name,
						avatar: req.user.avatar
					}
				};

				utils.crudRef('post', postValue.ref.child('like'), newLike);
				return res.status(200).json({ msg: 'Liked' });
			}
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	POST api/posts/unlike/:id
// @desc 	Unlike post 
// @access 	Private
router.post('/unlike/:post_id', authentication, async (req, res) => 
{
	try
	{
		const errors = {};

		const postChild = await utils.crudRef('get', post.orderByKey()
								.equalTo(req.params.post_id));
		
		if(!postChild.exists())
		{
			errors.nopost = 'There is no post for this user';
			return res.status(404).json(errors);
		}
		else
		{
			const postValue = await utils.getChild(postChild);

			const like = await utils.crudRef('get', postValue.ref.child('like')
							.orderByChild('user/id').equalTo(req.user.id));

			if(!like.exists())
			{
				errors.notliked = `You've not liked this post`;
				return res.status(400).json(errors);
			}
			else
			{
				utils.deleteComponent(like);
				return res.status(200).json({ msg: 'Unliked' });
			}
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	POST api/posts/comment/:id
// @desc 	Comment post 
// @access 	Private
router.post('/comment/:post_id', authentication, async (req, res) => 
{
	try
	{
		const { errors, isValid } = validateCommentInput(req.body);

		if(!isValid)
		{
			return res.status(400).json(errors);
		}

		const postChild = await utils.crudRef('get', post.orderByKey()
							.equalTo(req.params.post_id));
		
		if(!postChild.exists())
		{
			errors.nopost = 'There is no post for this user';
			return res.status(404).json(errors);
		}
		else
		{
			const newComment =
			{
				user:
				{
					id    : req.user.id,
					name  : req.user.name,
					avatar: req.user.avatar,
				},

				text: req.body.text,
				date: new Date().getTime()
			};
			
			const postValue = await utils.getChild(postChild);

			utils.crudRef('post', postValue.ref.child('comment'), newComment);
			return res.status(200).json({ msg: 'Comment added' });
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	DELETE api/posts/comment/:id/:comment_id
// @desc 	Delete comment
// @access 	Private
router.delete('/comment/:post_id/:comment_id', authentication, async (req, res) => 
{
	try
	{
		const errors = {};

		const postChild = await utils.crudRef('get', post.orderByKey()
								.equalTo(req.params.post_id));
		
		if(!postChild.exists())
		{
			errors.nopost = 'There is no post for this user';
			return res.status(404).json(errors);
		}
		else
		{
			const postValue = await utils.getChild(postChild);

			const comment = await utils.crudRef('get', postValue.ref.child('comment')
								.orderByKey().equalTo(req.params.comment_id));
			
			if(!comment.exists())
			{
				errors.nocomment = 'Comment not found';
				return res.status(404).json(errors);
			}
			else if(Object.values(comment.val())[0].user.id !== req.user.id)
			{
				errors.unauthorized = 'User not authorized';
				return res.status(401).json(errors);
			}
			else
			{
				utils.deleteComponent(comment);
				res.status(200).json({ msg: 'Comment deleted' });
			}
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

module.exports = router;