const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const firebase = require('firebase');
// const passport = require('passport');

// connect to firebase
const db = require('./src/config/keys').firebaseURI;
firebase.initializeApp(db);
console.log('Firebase connected...');

// below db coz containing model-user
require('./src/config/passport');

// routes file
const users = require('./src/routes/users');
const profile = require('./src/routes/profile');
const posts = require('./src/routes/posts');

// init app
app = express();

// ----------------------MIDDLEWARE---------------------- //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'dist')));

// ------------------------------------------------------ //

// use routes
app.use('/users', users);
app.use('/profile', profile);
app.use('/posts', posts);

// console.log(process.env)

app.all('*', (req, res) =>
{
	res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;

