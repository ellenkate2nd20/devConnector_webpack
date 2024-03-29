module.exports = 
{
	firebaseURI:
	{
		apiKey: process.env.API_KEY,
		authDomain: process.env.AUTH_DOMAIN,
		databaseURL: process.env.DATABASE_URL,
		projectId: process.env.PROJECT_ID,
		storageBucket: process.env.STORAGE_BUCKET,
		messagingSenderId: process.env.MESSAGING_SENDER_ID
	},

	secretOrKey: process.env.SECRET_OR_KEY
}