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

This code is written by Ashish Gupta, Tarun Mohandas, Suriya Prakash, Srinivasa Burli, Jishnu Surendran and Bhairavi Balakrishnan*/

var mongoose = require('mongoose');
 var db1 = mongoose.createConnection("mongodb://172.23.238.253:27018/nginx");
 var db2 = mongoose.createConnection("mongodb://172.23.238.253:27018/aptcache");
//var db1 = mongoose.createConnection("mongodb://localhost/nginx");
//var db2 = mongoose.createConnection("mongodb://localhost/LogAggregate");

var userSchema = require('./log.user.model');
var serverSchema = require('./log.server.model');
var configSchema = require('./log.config.model');
var aptLogSchema = require('./logSchema');
//var aptConfigSchema = require('./configSchema');

module.exports = {
  userModel : db1.model('User',userSchema),
  serverModel : db1.model('Logs',serverSchema),
  configModel : db1.model('Config',configSchema),
  aptLogModel : db2.model('aptLog',aptLogSchema)
};
