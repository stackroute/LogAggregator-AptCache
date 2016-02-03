var express = require('express');
var fs = require('fs');
var router = express.Router();
//var Logs = require('../../model/logSchema');
var Logs = require('../../models/dbConfig').aptLogModel;


router.get('/year/year_month/:year_month=?', function(req, res, next) {
  var year_month=req.params.year_month.split('_');
  var yearValue=parseInt(year_month[0]);
  var monthValue=year_month[1];
  var obj={};
  var matchObj={
    mode:"O",
    year:yearValue,
    download:{$regex:".deb$"}
  };

  if(monthValue)
  {
    matchObj['month']=monthValue;
  }

  Logs.aggregate([
    { $match : matchObj},
    { $group:{_id:{package:"$download"},count:{$sum:1}}}],
    function(err,doc){
      for(var i=0,j=1; i<doc.length; i++)
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
          obj[packageFile]["Serial Number"] = j++;
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
      res.json(finalresult);
    }
  );
});

module.exports = router;
