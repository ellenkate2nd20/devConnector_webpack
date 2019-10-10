const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const utils = require('../routes/utils');

const user = require('../models/User');
const keys = require('./keys');

const opts = 
{
	jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.secretOrKey
};

// from opts => get header => get user
passport.use(new jwtStrategy(opts, async (jwtPayload, done) =>
{
	userChild = await user.orderByKey().equalTo(jwtPayload.id).once('value');

	if(!userChild.exists())
	{
		return done(null, false);
	}
	else
	{
		userValue = Object.values(userChild.val())[0];
		
		const following = await utils.toArray(userValue, 'following');

		const userData = 
		{
			id       : jwtPayload.id,
			name     : userValue.name,
			email    : userValue.email,
			avatar   : userValue.avatar
		}

		return done(null, userData);
	}
}));