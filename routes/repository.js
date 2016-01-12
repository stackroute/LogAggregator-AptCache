var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/LogAggregate');
var User = require('../model/schema');

var data=new Object();
router.get('/:modetype=?',function(req,res,next){
  var modetype = req.params.modetype;

  function packageByRepo(repo,tempObj){

    var packages = tempObj.split('/');
    var rep=packages[0];
    var pool=packages[2];
    if(pool==="pool")
    pool=packages[3];
    var packageFile = packages[packages.length-1];
    var packageName=packageFile.split("_")[0];
    var packageVersion=packageFile.split("_")[1];
    if(repo[rep]==undefined)
    {
      repo[rep]={};
    }
    if(repo[rep][pool]==undefined)
    {
      repo[rep][pool]={};
    }
    if(repo[rep][pool][packageFile]==undefined)
    {
      repo[rep][pool][packageFile]={};
      var packageFileName = packageFile.split('_')[0];
      var packageFileVersion = packageFile.split('_')[1];
      repo[rep][pool][packageFile]["Name"] = packageFileName;
      repo[rep][pool][packageFile]["Version"] = packageFileVersion;
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
  User.aggregate([{$match :{download:{$regex:".deb$"},mode:mode}},{$group:{_id:{filename:"$download"}}}],function(err,result){

    for(var i=0;i<result.length;i++){
    tempObj.push(result[i]["_id"]["filename"])
    }
    for(var i=0;i<tempObj.length;i++){
      packageByRepo(data,tempObj[i]);
    }
    res.json(data);
    });
  

});


module.exports = router;
