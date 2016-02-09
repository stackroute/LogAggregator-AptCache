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
var crypto = require('crypto');
var Schema =  mongoose.Schema;

var LogUserSchema = new Schema({
  firstName : String,
  lastName : String,
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
  },
  username : {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true
  },
  password : {
    type: String,
    validate: [
    function(password) {
        return password && password.length > 6;
      }, 'Password should be longer'
    ]
  },
   hash : String,
  created: {
    type: Date,
    default: Date.now
  }
},{collection: "users"});

LogUserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

LogUserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.hash, 10000, 64).toString('base64');
};

LogUserSchema.methods.authenticate = function(password) {
  console.log("inside log user model");
  return this.password === this.hashPassword(password);
};

LogUserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

LogUserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

module.exports = LogUserSchema;
