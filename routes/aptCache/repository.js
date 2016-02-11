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

var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongoose = require('mongoose');

var Logs = require('../../models/dbConfig').aptLogModel;


var data=new Object();
router.get('/:year=?/:modetype=?',function(req,res,next){
  var modetype = req.params.modetype;
  var yearValue = parseInt(req.params.year);
  var startMonth = "Jan";
  var endMonth = "Dec";

  var startDate = startMonth+" 1, "+yearValue;
  var endDate = endMonth+" 31, "+yearValue+" 23:59:59";
  var startTimestamp = Date.parse(startDate)/1000;
  startTimestamp = startTimestamp.toString();
  var endTimestamp = Date.parse(endDate)/1000;
  endTimestamp = endTimestamp.toString();

  function package(repo,tempObj){
    var temp={};
    var packages = tempObj.split('/');
    var rep=packages[0];
    var pool=packages[2];
    if(pool==="pool")
    pool=packages[3];
    var packageFile = packages[packages.length-1];
    var packageName=packageFile.split("_")[0];
    var packageVersion=packageFile.split("_")[1];
    temp["repository"]=rep;
    temp["pool"]=pool;
    temp["packageName"]=packageName;
    temp["packageVersion"]=packageVersion;
    repo.push(temp);
  }
  function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }
  function dynamicSortMultiple() {

    var props = arguments;
    return function (obj1, obj2) {
      var i = 0, result = 0, numberOfProperties = props.length;
      while(result === 0 && i < numberOfProperties) {
          result = dynamicSort(props[i])(obj1, obj2);
          i++;
      }
      return result;
    }
  }
  var tempObj=[];
  var mode="";
  if(modetype==="Input"){
     mode = "I"
  }
  else if(modetype==="Output"){
    mode = "O";
  }
  data=[];

  // db.aptcache.aggregate([
  // {$match: {timestamp: {$gte:"1454284800", $lte:"1456790399"}, path:{$regex: ".deb$"}, mode:"O"}},
  // {$group: {_id: {filename:"$path"}}}
  // ])


  Logs.aggregate([
    {$match :{timestamp:{$gte:startTimestamp,$lte:endTimestamp},path:{$regex:".deb$"},mode:mode}},
    {$group:{_id:{filename:"$path"}}}],
    function(err,result){

    for(var i=0;i<result.length;i++){
    tempObj.push(result[i]["_id"]["filename"])
    }

    for(var i=0;i<tempObj.length;i++){
      package(data,tempObj[i]);
    }

    data.sort(dynamicSortMultiple("repository", "-pool"));

    res.json(data);
    });
});


module.exports = router;
