const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const user = require('../models/User');
const keys = require('../config/keys');

// input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// supporting function
const utils = require('./utils');

const authentication = passport.authenticate('jwt', { session:false });

// @route 	GET api/users/test
// @desc 	Test users route
// @access 	Private
router.get('/test', (req, res) => res.json({msg: 'users works'}));

// @route 	POST /users/register
// @desc 	Register user
// @access 	Public
router.post('/register', async (req, res) =>
{
	try
	{
		const { errors, isValid } = validateRegisterInput(req.body);

		if(!isValid)
		{
			return res.status(400).json(errors);
		}

		userChild = await utils.crudRef('get', user.orderByChild('email')
							.equalTo(req.body.email));
		
		if(userChild.exists())
		{
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		}
		else
		{
			const avatar = gravatar.url(
				req.body.email,
				{
					s: '200', // size
					r: 'pg',  // rating
					d: 'mm'   // default
				}
			);

			const salt = await bcrypt.genSalt(10);

			const newUser = 
			{
				avatar,
				name    : req.body.name,
				email   : req.body.email,				
				password: await bcrypt.hash(req.body.password, salt),
				date    : new Date().getTime()
			};

			utils.crudRef('post', user, newUser);

			return res.status(200).json(newUser);
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	POST /users/login
// @desc 	Login user / Return token
// @access 	Public
router.post('/login', async (req, res) =>
{
	try
	{
		const { errors, isValid } = validateLoginInput(req.body);

		if(!isValid)
		{
			return res.status(400).json(errors);
		}

		userChild = await utils.crudRef('get', user.orderByChild('email')
						.equalTo(req.body.email));

		if(!userChild.exists())
		{
			errors.email = 'Email not found';
			return res.status(400).json(errors);
		}
		else
		{
			const userValue = Object.values(userChild.val())[0];

			isMatch = await bcrypt.compare(req.body.password, userValue.password);
			
			if(isMatch)
			{
				const following = await utils.toArray(userValue, 'following');

				const payload = 
				{
					id    : Object.keys(userChild.val())[0],
					name  : userValue.name,
					avatar: userValue.avatar
				};

				// sign token
				jwt.sign(
					payload, 
					keys.secretOrKey, 
					{ expiresIn: 3600 }, 
					(err, token) => res.status(200).json({ token: 'Bearer ' + token })
				);
			}
			else
			{
				errors.password = 'Password is incorrect';
				return res.status(400).json(errors);
			}
		}
	}
	catch(err)
	{
		return res.status(404).json(err);
	}
});

// @route 	GET api/users/current
// @desc 	Return current user
// @access 	Private
router.get('/current', authentication, (req, res) =>
{
	return res.json(req.user);
});

module.exports = router;