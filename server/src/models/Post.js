const firebase = require('firebase');
const db = require('../config/keys').firebaseURI;

firebase.initializeApp(db, 'post');
var postRef = firebase.database().ref().child('post');

module.exports = postRef;

// user (objectID)
// text (string)
// name (string)
// avatar 
// likes (object)
// {
// 		user 
// }
// comments
// {
// 		user
//		text
//		name
//		avatar
//		date
// }
// date