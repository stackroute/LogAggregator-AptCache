var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/LogAggregate');
var Logs = require('../../model/logSchema');

var data=new Object();
router.get('/:year=?/:modetype=?',function(req,res,next){
  var modetype = req.params.modetype;
  var year = parseInt(req.params.year);

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
  Logs.aggregate([{$match :{year:year,download:{$regex:".deb$"},mode:mode}},{$group:{_id:{filename:"$download"}}}],function(err,result){

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
