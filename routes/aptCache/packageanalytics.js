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

function makeQuery(period){
    // var match = new Object();
    // dataRange = period.split('_');
    //
    // if(dataRange.length===1){
    //     match["year"]=parseInt(dataRange[0]);
    // }
    // else if(dataRange.length===2){
    //     match["year"]=parseInt(dataRange[0]);
    //     match["month"]=dataRange[1];
    // }
    // return match;

    var year_month = period.split('_');
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

    var match={
      timestamp : {$gte: startTimestamp, $lte: endTimestamp}
    };

    console.log(match);
    return match;
}

function createData(result){
  var data = new Object();
  var jsonData = new Array();
  for(var i=0; i<result.length; i++){
    var arr = result[i]["_id"]["download"].split('/');
    var os = "";
    var len = arr.length;
    if(arr[0]==="security.debian.org"){
        os = arr[2].split('-');
    }
    else{
        os = arr[len-4].split('-');
    }
    if(data[arr[0]]==undefined){
        data[arr[0]] = new Object();
        data[arr[0]][os[0]] = 1;
    }
    else if(data[arr[0]][os[0]]==undefined){
        data[arr[0]][os[0]] = 1;
    }
    else{
        data[arr[0]][os[0]]+=result[i]["count"];
    }
  }
  for(pack in data){
      tempObj = new Object();
      tempObj["package"] = pack;
      for(osName in data[pack]){
          tempObj["os"] = osName;
          tempObj["count"] = data[pack][osName];
      }
      jsonData.push(tempObj);
  }
  return jsonData;
}

// db.aptcache.aggregate([
// {$match: {timestamp: {$gte:"1454284800", $lte:"1456790399"}}},
// {$group: {_id: {"download":"$path"}, count: {$sum:1}}}])


router.get('/package/:packinfo=?/:period=?',function(req,res,next){
    var packinfo = req.params.packinfo;
    var period = req.params.period;
    if(packinfo === "package_bz2_info"){
        var matchParam = makeQuery(period);
        Logs.aggregate([
          {$match:matchParam},
          {$group:{_id: {"download":"$path"},count:{$sum:1}}}],
          function(err,result){
            // console.log(result);
            jsonData = createData(result);
            res.json(jsonData);
          }
        );
    }
});

module.exports = router;
