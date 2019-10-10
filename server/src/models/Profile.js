const firebase = require('firebase');
const db = require('../config/keys').firebaseURI;

firebase.initializeApp(db, 'profile');
var profileRef = firebase.database().ref().child('profile');

module.exports = profileRef;

// user (objectID)
// handle (string)
// company (string)
// website (string)
// location (strng)
// status (string/selected)
// skills ([string])
// bio (string)
// githubUsername (string)
// experience (
// 	[
// 		title (string)
// 		company (string)
// 		location (string)
// 		from (datetime)
// 		to (datetime)
// 		current (boolean)
// 		description (string)
// 	]
// )
// education (
// 	[
// 		school (string)
// 		degree (string)
// 		fieldOfStudy (string)
// 		from (datetime)
// 		to (datetime)
// 		current (boolean)
// 		description (string)
// 	]
// )
// social (
// 	[
// 		youtube (string)
// 		twitter (string)
// 		facebook (string)
// 		linkedin (datetime)
// 		instagram (datetime)
// 	]
// )
// date(datetime)