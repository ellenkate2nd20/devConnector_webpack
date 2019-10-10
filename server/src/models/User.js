const firebase = require('firebase');
const db = require('../config/keys').firebaseURI;

firebase.initializeApp(db, 'user');
var userRef = firebase.database().ref().child('user');

module.exports = userRef;

// name (string)
// email (email)
// password (string)
// avatar (string)
// date (datetime)