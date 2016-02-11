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
var rl = require('readline').createInterface({
  input: require('fs').createReadStream('apt-cacher.log')
});

/************************************** Global variables ********************************/
months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
log_json = new Array();
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  timeObj = new Object();
  timeObj["date"] = date;
  timeObj["month"] = month;
  timeObj["year"] = year;
  timeObj["time"] = hour + ':' + min + ':' + sec;
  return timeObj;
}


rl.on('line',function(line){
  var arr = line.split('|');
  tempObj = new Object();
  var tempTime = timeConverter(parseInt(arr[0]));
  tempObj["date"] = tempTime["date"];
  tempObj["month"] = tempTime["month"];
  tempObj["year"] = tempTime["year"];
  tempObj["time"] = tempTime["time"];
  tempObj["mode"] = arr[1];
  tempObj["size"] = parseInt(arr[2]);
  tempObj["source_ip"] = arr[3];
  tempObj["download"] = arr[4];
  log_json.push(tempObj);
});

rl.on('close',function(){
  //  writeJson(log_json,'../json/apt-cacher.json');
  var MongoClient = require('mongodb').MongoClient
      , format = require('util').format;
  MongoClient.connect('mongodb://172.23.238.253:27018/LogAggregate', function (err, db) {
      if (err) {
          throw err;
      } else {
          console.log("successfully connected to the database");
      }

  var collection = db.collection('AllLogsData');
  var LENGTH = log_json.length;
  for(var i = 0 ; i<LENGTH; i++)
  {
      collection.insert(log_json[i]);
  }
    db.close();
});
});
