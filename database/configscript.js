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

var fs = require('fs');
var data = fs.readFileSync('info.json');

var jsonData = JSON.parse(data);
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

MongoClient.connect('mongodb://172.23.238.253:27018/LogAggregate', function (err, db) {

  if (err) {
    throw err;
  } else {
    console.log("successfully connected to the database");
  }

  var collection = db.collection('ConfigData');
  collection.insert(jsonData);
  db.close();
});
