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
var User = require('./models/dbConfig.js').userModel;
var LocalStrategy   = require('passport-local').Strategy;
var crypto = require('crypto');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
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
						return done(null, false);
					}
					// User exists but wrong password, log the error
					if (!(isValidPassword(user,password))){
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

			// find a user in mongo with provided username
			User.findOne({ 'username' :  username }, function(err, user) {
				// In case of any error, return using the done method
				if (err){
					return done(err);
				}
				// already exists
				if (user) {
					return done(null, false);
				} else {
					// if there is no user, create the user
					var newUser = new User();
					var hash=crypto.randomBytes(16).toString('base64');

					// set the user's local credentials
					newUser.username = username;
					newUser.hash=hash;
					newUser.password = crypto.pbkdf2Sync(req.body.password,hash, 10000, 64).toString('base64');
					newUser.email=req.body.email;
					newUser.firstName=req.body.firstName;
					newUser.lastName=req.body.lastName;

					// save the user
					newUser.save(function(err) {
						if (err){
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		})
	);

	var isValidPassword = function(user,password) {

		if(user.password==crypto.pbkdf2Sync(password, user.hash, 10000, 64).toString('base64')){
				return true;
		}
		else {
			return false;
		}
	};
};
