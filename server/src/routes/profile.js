const express = require('express');
const router = express.Router();
const passport = require('passport');

// models
const profile = require('../models/Profile');
const user = require('../models/User');
const post = require('../models/Post');

// input validation
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require('../validation/experience');
const validateEducationInput = require('../validation/education');

// supporting function
const utils = require('./utils');

const authentication = passport.authenticate('jwt', { session:false });

// @route 	GET api/profile/test
// @desc 	Test profile route
// @access 	Public
router.get('/test', (req, res) => res.json({msg: 'profile works'}));

// @route 	GET api/profile/perpage/:pagenumber
// @desc 	Get perpage profiles
// @access 	Public
router.get('/all', async (req, res) =>
{
	try
	{
		const errors = {};
		const data = [];

		profileChild = await utils.crudRef('get', profile);

		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}
		else
		{
			profileValue = profileChild.val();

			for(var key in profileValue)
			{
				const profileData = profileValue[key];

				const [experience, education, following] = await Promise.all(
				[
					utils.toArray(profileData, 'experience'),
					utils.toArray(profileData, 'education'),
					utils.toArray(profileData, 'following')
				]);

				const profileArray =
				{
					...profileData,
					id        : key,
					following,				
					experience: experience.reverse(),
					education : education.reverse()
				}

				data.push(profileArray);
			}
		}

		return res.json(data);
	}
	catch(err)
	{
		return res.status(404).json(err)
	}
});

// @route 	GET api/profile
// @desc 	Get current user profile
// @access 	Private
router.get('/', authentication, async (req, res) =>
{	
	try
	{
		const errors = {};

		profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
							.equalTo(req.user.id));

		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user'
			return res.status(404).json(errors);
		}

		profileValue = Object.values(profileChild.val())[0];

		const [experience, education, following] = await Promise.all(
		[
			utils.toArray(profileValue, 'experience'),
			utils.toArray(profileValue, 'education'),
			utils.toArray(profileValue, 'following')
		]);

		const data =
		{
			...profileValue,
			id         : req.params.id,
			following,
			experience : experience.reverse(),
			education  : education.reverse()
		};

		return res.status(200).json(data);
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	GET api/profile/handle/:handle
// @desc 	Get profile by handle
// @access 	Public
router.get('/handle/:handle', async (req, res) =>
{	
	try
	{
		const errors = {};

		profileChild = await utils.crudRef('get', profile.orderByChild('handle')
							.equalTo(req.params.handle));

		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}
		else
		{
			profileValue = Object.values(profileChild.val())[0];

			const [experience, education] = await Promise.all(
			[
				utils.toArray(profileValue, 'experience'),
				utils.toArray(profileValue, 'education')
			]);

			const data =
			{
				...profileValue,
				id         : Object.keys(profileChild.val())[0],
				experience : experience.reverse(),
				education  : education.reverse()
			};

			return res.status(200).json(data);
		}
	}
	catch(err)
	{
		return res.status(404).json(err);	
	}
});


// @route 	GET profile/user/:user_id
// @desc 	Get profile by user ID
// @access 	Public
router.get('/user/:user_id', async (req, res) =>
{
	try
	{
		const errors = {};

		profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
							.equalTo(req.params.user_id));
		
		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}
		else
		{
			profileValue = Object.values(profileChild.val())[0];

			const [experience, education, following] = await Promise.all(
			[
				utils.toArray(profileValue, 'experience'),
				utils.toArray(profileValue, 'education'),
				utils.toArray(profileValue, 'following')
			]);

			const data =
			{
				...profileValue,
				id         : req.params.id,
				following,
				experience : experience.reverse(),
				education  : education.reverse()
			};

			return res.status(200).json(data);
		}
	}
	catch(err)
	{
		return res.status(404).json(err);	
	}
});

// @route 	GET profile/experience/:exp_id
// @desc 	Get profile by user ID
// @access 	Public
// router.get('/experience/:user_id/:exp_id', passport.authenticate('jwt', {session:false}), async (req, res) =>
// {
// 	try
// 	{
// 		const errors = {};

// 		profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
// 							.equalTo(req.params.user_id));
		
// 		if(!profileChild.exists())
// 		{
// 			errors.noprofile = 'There is no profile for this user';
// 			return res.status(404).json(errors);
// 		}
// 		else
// 		{
// 			profileValue = Object.values(profileChild.val())[0];

// 			const experience = profileValue.experience[req.params.exp_id];

// 			return res.status(200).json(experience);
// 		}
// 	}
// 	catch(err)
// 	{
// 		return res.status(404).json(err);	
// 	}
// });

// @route 	POST api/profile
// @desc 	Create or update user profile
// @access 	Private
router.post('/', authentication, async (req, res) => 
{	
	try
	{
		const { errors, isValid } = validateProfileInput(req.body);

		if(!isValid)
		{
			return res.status(400).json(errors);
		}
		
		profileHandle = await utils.crudRef('get', profile.orderByChild('handle')
							.equalTo(req.body.handle));
		
		if(profileHandle.exists() 
				&& Object.values(profileHandle.val())[0].user.id !== req.user.id)
		{
			errors.handle = 'That handle already exists';
			return res.status(400).json(errors);
		}
		else
		{
			const newProfile = 
			{
				user:
				{
					id    : req.user.id,
					name  : req.user.name,
					avatar: req.user.avatar
				},
				
				handle: req.body.handle,
				status: req.body.status,
				skills: req.body.skills.split(','),

				bio           : req.body.bio            || '',
				company       : req.body.company        || '',
				website       : req.body.website        || '',
				location      : req.body.location       || '',
				githubUsername: req.body.githubUsername || '',
				
				social:
				{
					youtube  : req.body.youtube   || '',
					twitter  : req.body.twitter   || '',
					facebook : req.body.facebook  || '',
					linkedin : req.body.linkedin  || '',
					instagram: req.body.instagram || ''
				}
			};

			profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
								.equalTo(req.user.id));
			
			if(profileChild.exists())
			{
				const profileValue = await utils.getChild(profileChild);

				utils.crudRef('update', profileValue.ref, newProfile);

				return res.status(200).json({msg: 'Profile updated'});
			}
			else
			{
				newProfile.date = new Date().getTime();

				utils.crudRef('post', profile, newProfile);
				
				return res.status(200).json(newProfile);
			}
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	POST /profile/experience
// @desc 	Add experience to profile
// @access 	Private
router.post('/experience', authentication, async (req, res) => 
{
	try
	{
		const { errors, isValid } = validateExperienceInput(req.body);

		if(!isValid)
		{
			return res.status(400).json(errors);
		}

		profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
							.equalTo(req.user.id));
		
		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}

		const newExp =
		{
			title      : req.body.title       || '',
			company    : req.body.company     || '',
			location   : req.body.location    || '',
			body       : req.body.body        || '',
			from       : req.body.from        || '',
			to         : req.body.to          || '',
			current    : req.body.current     || false,
			description: req.body.description || ''
		};
		
		// Get original profileValue in order to use => profile.ref 
		const profileValue = await utils.getChild(profileChild);
		
		if(!req.query.exp_id)
		{
			utils.crudRef('post', profileValue.ref.child('experience'), newExp);
			return res.status(200).json({ msg: 'Experience added' });
		}

		// find exp by id
		const expChild = await utils.crudRef('get', profileValue.ref.child('experience')
							.orderByKey().equalTo(req.query.exp_id));

		if(!expChild.exists())
		{
			errors.noexp = 'No experience found';
			return res.status(404).json(errors);
		}
		else
		{
			const expValue = await utils.getChild(expChild);

			// if exist => update it
			utils.crudRef('update', expValue.ref, newExp);
			return res.status(200).json({msg: 'Experience updated'});
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	DELETE api/profile/experience/:exp_id
// @desc 	Delete experience from profile
// @access 	Private
router.delete('/experience/:exp_id', authentication, async (req, res) => 
{	
	try
	{
		const errors = {};

		const profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
							.equalTo(req.user.id));
		
		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}
		else
		{
			const profileValue = await utils.getChild(profileChild);

			const expChild = await utils.crudRef('get', profileValue.ref.child('experience')
							.orderByKey().equalTo(req.params.exp_id));

			if(!expChild.exists())
			{
				errors.noexp = 'No experience found';
				return res.status(404).json(errors);
			}
			else
			{
				utils.deleteComponent(expChild);
				res.status(200).json({ msg: 'Experience deleted' });
			}
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	POST api/profile/education
// @desc 	Add education to profile
// @access 	Private
router.post('/education', authentication, async (req, res) => 
{
	try
	{
		const { errors, isValid } = validateEducationInput(req.body);

		if(!isValid)
		{
			return res.status(400).json(errors);
		}

		profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
							.equalTo(req.user.id));
		
		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}

		const newEdu =
		{
			school      : req.body.school       || '',
			degree      : req.body.degree       || '',
			fieldOfStudy: req.body.fieldOfStudy || '',
			from        : req.body.from         || '',
			to          : req.body.to           || '',
			current     : req.body.current      || false,
			description : req.body.description  || ''
		};

		const profileValue = await utils.getChild(profileChild);

		if(!req.query.edu_id)
		{
			utils.crudRef('post', profileValue.ref.child('education'), newEdu);
			return res.status(200).json({ msg: 'Education added' });
		}

		// find exp by id
		const eduChild = await utils.crudRef('get', profileValue.ref.child('education')
							.orderByKey().equalTo(req.query.edu_id));

		if(!eduChild.exists())
		{
			errors.noedu = 'No education found';
			return res.status(404).json(errors);
		}
		else
		{
			const eduValue = await utils.getChild(eduChild);

			// if exist => update it
			utils.crudRef('update', eduValue.ref, newEdu);
			return res.status(200).json({msg: 'Education updated'});
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	DELETE api/profile/education/:edu_id
// @desc 	Delete education from profile
// @access 	Private
router.delete('/education/:edu_id', authentication, async (req, res) =>
{
	try
	{
		const errors = {};

		const profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
							.equalTo(req.user.id));
		
		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}
		else
		{
			const profileValue = await utils.getChild(profileChild);

			const eduChild = await utils.crudRef('get', profileValue.ref.child('education')
							.orderByKey().equalTo(req.params.edu_id));

			if(!eduChild.exists())
			{
				errors.noedu = 'No education found';
				return res.status(404).json(errors);
			}
			else
			{
				utils.deleteComponent(eduChild);
				res.status(200).json({ msg: 'Education deleted' });
			}
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	DELETE api/profile/experience/:exp_id
// @desc 	Delete experience from profile
// @access 	Private
router.post('/follow/:user_id', authentication, async (req, res) => 
{	
	try
	{
		const errors = {};

		const profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
							.equalTo(req.user.id));
		
		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}

		const following = await utils.toArray(Object.values(profileChild.val())[0], 'following');

		if(following.includes(req.params.user_id))
		{
			errors.alreadyfollowed = `You've already followed this user`;
			return res.status(404).json(errors);
		}
		
		const followerChild = await utils.crudRef('get', profile.orderByChild('user/id')
							.equalTo(req.params.user_id));
		
		if(!followerChild.exists())
		{
			errors.nofollower = `There is no follower for this id`;
			return res.status(404).json(errors);
		}

		const profileValue = await utils.getChild(profileChild);
		utils.crudRef('post', profileValue.ref.child('following'), req.params.user_id);
		return res.status(200).json({ msg: `Following added` });
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	POST /users/follow/:id
// @desc 	Follow user 
// @access 	Private
router.post('/unfollow/:user_id', authentication, async (req, res) =>
{
	try
	{
		const errors = {};
		
		const profileChild = await utils.crudRef('get', profile.orderByChild('user/id')
							.equalTo(req.user.id));

		if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this id';
			return res.status(404).json(errors);
		}

		// find follow_id by user_id => follow_id to reference and delete
		const followValue = Object.values(profileChild.val())[0].following;

		const follow_id = Object.keys(followValue).find(key => followValue[key] === req.params.user_id);

		if(!follow_id)
		{
			errors.nofollower = 'No follower found';
			return res.status(404).json(errors);
		}

		const profileValue = await utils.getChild(profileChild);

		const followChild = await utils.crudRef('get', profileValue.ref.child('following')
								.orderByKey().equalTo(follow_id));

		await utils.deleteComponent(followChild);
		res.status(200).json({ msg: 'Follower deleted' });
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	DELETE api/profile
// @desc 	Delete user from profile
// @access 	Private
router.delete('/', authentication, async (req, res) => 
{	
	try
	{
		const errors = {};

		const [userChild, profileChild, postChild] = await Promise.all(
		[
			utils.crudRef('get', user.orderByKey().equalTo(req.user.id)),
			utils.crudRef('get', profile.orderByChild('user/id').equalTo(req.user.id)),
			utils.crudRef('get', post.orderByChild('user/id').equalTo(req.user.id)),
		]);
		
		if(!userChild.exists())
		{
			errors.nouser = 'No user found';
			return res.status(404).json(errors);
		}
		else if(!profileChild.exists())
		{
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}

		await Promise.all(
		[
			utils.deleteComponent(userChild),
			utils.deleteComponent(profileChild),
			utils.deleteComponent(postChild)
		]);

		return res.status(200).json({ msg: 'Account deleted' });
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

module.exports = router;