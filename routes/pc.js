var express = require('express');
var fs = require('fs');
var mongoClient=require('mongodb');
var url='mongodb://localhost/LogAggregate';

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var obj={};
  mongoClient.connect(url,function(err,db){
    var cursor=db.collection('AllLogsData').find();
    cursor.toArray(function(err,doc){
      for(var i=0; i<doc.length; i++)
      {
        len = doc[i]["download"].length;
        if(doc[i]["year"]===2015 && doc[i]["mode"]==="O" && doc[i]["download"].substring(len-4,len ) === ".deb" )
        {
          var packages = doc[i]["download"].split('/');
          var packageFile = packages[packages.length-1];
          if(obj[packageFile]==undefined)
          {
            obj[packageFile]={};
            var packageFileName = packageFile.split('_')[0];
            var packageFileVersion = packageFile.split('_')[1];
            var packageFileArch = packageFile.split('_')[2].split('.')[0];
            obj[packageFile]["Package Name"] = packageFileName;
            obj[packageFile]["Package Version"] = packageFileVersion;
            obj[packageFile]["Package Architecture"] = packageFileArch;
            obj[packageFile]["Count"]=1;
          }
          else
          {
            obj[packageFile]["Count"]++;
          }
        }
      }
      var finalresult=[];
      for(item in obj)
      {
        finalresult.push(obj[item]);
      }
      var jsonString = JSON.stringify(finalresult,null,4);
      res.send(jsonString);
    });
  });
});


// var mainObjMonthly = {};
router.get('/month1/month/:month=?', function(req, res, next) {
  var obj={};
  var month = req.params.month;
  mongoClient.connect(url,function(err,db){
    var cursor=db.collection('AllLogsData').find();
    cursor.toArray(function(err,doc){
      for(var i=0; i<doc.length; i++)
      {
        len = doc[i]["download"].length;
        if(doc[i]["year"]===2015 && doc[i]["month"]===month && doc[i]["mode"]==="O" && doc[i]["download"].substring(len-4,len ) === ".deb" )
        {
          var packages = doc[i]["download"].split('/');
          var packageFile = packages[packages.length-1];
          if(obj[packageFile]==undefined)
          {
            obj[packageFile]={};
            var packageFileName = packageFile.split('_')[0];
            var packageFileVersion = packageFile.split('_')[1];
            var packageFileArch = packageFile.split('_')[2].split('.')[0];
            obj[packageFile]["Package Name"] = packageFileName;
            obj[packageFile]["Package Version"] = packageFileVersion;
            obj[packageFile]["Package Architecture"] = packageFileArch;
            obj[packageFile]["Count"]=1;
          }
          else
          {
            obj[packageFile]["Count"]++;
          }
        }
      }
      var finalresult=[];
      for(item in obj)
      {
        finalresult.push(obj[item]);
      }
      var jsonString = JSON.stringify(finalresult,null,4);
      res.send(jsonString);
    });
  });
});


module.exports = router;
