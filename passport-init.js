/*Copyright 2016 Wipro Limited, NIIT Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

This code is written by Prateek Reddy Yammanuru, Shiva Manognya Kandikuppa, Uday Kumar Mydam, Nirup TNL, Sandeep Reddy G, Deepak Kumar*/

var mongoose = require('mongoose');
//var User = require('mongoose').model('User');
var User = require('./models/dbConfig.js').userModel;
var LocalStrategy   = require('passport-local').Strategy;
//var bCrypt = require('bcrypt-nodejs');
var crypto = require('crypto');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user.username);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		console.log("Session id is"+id);
		// console.log("request object is"+req.session);
		User.findById(id, function(err, user) {
			console.log('deserializing user:',user.username);
			console.log("inside deserializeUser");

			done(err, user);
		});
	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) {
			// check in mongo if a user with username exists or not
			User.findOne({ 'username' :  username },
				function(err, user) {
					// In case of any error, return using the done method
					if (err)
						return done(err);
					// Username does not exist, log the error and redirect back
					if (!user){
						console.log('User Not Found with username '+username);
						return done(null, false);
					}
					// User exists but wrong password, log the error
					if (!(isValidPassword(user,password))){
						console.log('Invalid Password');
						return done(null, false); // redirect back to login page
					}
					// User and password both match, return user from done method
					// which will be treated like success
					return done(null, user);
				}
			);
		}
	));

	passport.use('signup', new LocalStrategy({
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req,username,password,done) {
			console.log("inside Passport"+req.body);

			// find a user in mongo with provided username
			User.findOne({ 'username' :  username }, function(err, user) {
				// In case of any error, return using the done method
				if (err){
					console.log('Error in SignUp: '+err);
					return done(err);
				}
				// already exists
				if (user) {
					console.log('User already exists with username: '+username);
					return done(null, false);
				} else {
					// if there is no user, create the user
					var newUser = new User();
					var hash=crypto.randomBytes(16).toString('base64');

					// set the user's local credentials
					newUser.username = username;
					newUser.hash=hash;
					newUser.password = crypto.pbkdf2Sync(req.body.password,hash, 10000, 64).toString('base64');
					console.log("signup hash"+hash);
					console.log("new USer Hash"+newUser.hash);
					newUser.email=req.body.email;
					newUser.firstName=req.body.firstName;
					newUser.lastName=req.body.lastName;

					// save the user
					newUser.save(function(err) {
						if (err){
							console.log('Error in Saving user: '+err);
							throw err;
						}
						console.log(newUser.username + ' Registration succesful');
						return done(null, newUser);
					});
				}
			});
		})
	);

	var isValidPassword = function(user,password) {
		console.log(user.password+" user password");
		console.log(crypto.pbkdf2Sync(password, user.hash, 10000, 64).toString('base64')+"database Password");
		console.log(user.hash+"             signin");

		if(user.password==crypto.pbkdf2Sync(password, user.hash, 10000, 64).toString('base64')){
				return true;
		}
		else {
			return false;
		}
	};
//
// var createHash = function(password) {
// 	  return this.password === this.hashPassword(password);
// 	};

	// var isValidPassword = function(user, password){
	// 	return bCrypt.compareSync(password, user.password);
	// };
	// // Generates hash using bCrypt
	// var createHash = function(password){
	// 	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	// };

};
