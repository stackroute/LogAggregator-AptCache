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
