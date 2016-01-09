var express = require('express');
var fs = require('fs');
var router = express.Router();
var User = require('../model/schema');

/* GET home page. */
router.get('/year/yearwise/:year=?', function(req, res, next) {
  var obj={};
  var yearName = parseInt(req.params.year);
  User.aggregate([{$match : {mode:"O",year:yearName,download:{$regex:".deb$"}}},{$group:{_id:{package:"$download"},count:{$sum:1}}}], function(err,doc){
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


router.get('/year/monthwise/:year=?/:month=?', function(req, res, next) {
  var obj={};
  var monthName = req.params.month;
  var yearName = parseInt(req.params.year);
  User.aggregate([{$match : {mode:"O",year:yearName,month:monthName,download:{$regex:".deb$"}}},{$group:{_id:{package:"$download"},count:{$sum:1}}}], function(err,doc){

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

module.exports = router;
