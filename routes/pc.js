var express = require('express');
var fs = require('fs');
var mongoClient=require('mongodb');
var url='mongodb://localhost/LogAggregate';

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var obj={};
  mongoClient.connect(url,function(err,db){
    var cursor=db.collection("AllLogsData").aggregate([{$match : {mode:"O",year:2015,download:{$regex:".deb$"}}},{$group:{_id:{package:"$download"},count:{$sum:1}}}]);
    cursor.toArray(function(err,doc){
      for(var i=0; i<doc.length; i++)
      {
        len = doc[i]["_id"]["package"].length;
          var packages = doc[i]["_id"]["package"].split('/');
          var count = doc[i]["count"];
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
            obj[packageFile]["Count"]=count;
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


router.get('/month1/month/:month=?', function(req, res, next) {
  var obj={};
  var pmonth = req.params.month;
  mongoClient.connect(url,function(err,db){
    var cursor=db.collection("AllLogsData").aggregate([{$match : {mode:"O",year:2015,month:pmonth,download:{$regex:".deb$"}}},{$group:{_id:{package:"$download"},count:{$sum:1}}}]);
    cursor.toArray(function(err,doc){
      for(var i=0; i<doc.length; i++)
      {
        len = doc[i]["_id"]["package"].length;
          var packages = doc[i]["_id"]["package"].split('/');
          var count = doc[i]["count"];
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
            obj[packageFile]["Count"]=count;
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
