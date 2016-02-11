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

var Logs = require('../../models/dbConfig').aptLogModel;


router.get('/year/year_month/:year_month=?', function(req, res, next) {
  var year_month=req.params.year_month.split('_');
  var yearValue=parseInt(year_month[0]);
  var monthValue=year_month[1];
  var obj={};

  var monthsArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var monthPos = monthsArray.indexOf(monthValue);
  var days = new Date(yearValue, monthPos+1, 0).getDate();
  var startMonth = "Jan";
  var endMonth = "Dec";

  if(monthValue) {
    startMonth = monthValue
    endMonth = monthValue;
  }


  var startDate = startMonth+" 1, "+yearValue;
  var endDate = endMonth+" "+days+", "+yearValue+" 23:59:59";
  var startTimestamp = Date.parse(startDate)/1000;
  startTimestamp = startTimestamp.toString();
  var endTimestamp = Date.parse(endDate)/1000;
  endTimestamp = endTimestamp.toString();
  console.log(startDate," ",startTimestamp);
  console.log(endDate," ",endTimestamp);

  var matchObj={
    timestamp : {$gte: startTimestamp, $lte: endTimestamp},
    mode : "O",
    path : {$regex:".deb$"}
  };

  console.log(matchObj);

  Logs.aggregate([
    { $match : matchObj},
    { $group:{_id:{package:"$path"},count:{$sum:1}}}],
    function(err,doc){
      console.log(doc);
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
