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


var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
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
function createMonthlyData(result,year,month){
    data = new Array();
    var monthPos = months.indexOf(month);
    var days = new Date(year, monthPos+1, 0).getDate();
    for(var i=1; i<=days; i++){
        tempObj = new Object();
        tempObj["period"] = i;
        tempObj["Input"] = 0;
        tempObj["Output"] = 0;
        data.push(tempObj);
    }
    var LENGTH = result.length;
    for(var i=0; i<LENGTH; i++){
          var timeObj = timeConverter(parseInt(result[i]["timestamp"]));
          if(result[i]["mode"]==="I"){
            data[timeObj["date"]-1]["Input"]+=1;
          }
          else{
            data[timeObj["date"]-1]["Output"]+=1;
          }
    }
    return data;
}
function createYearlyData(result){
    data = new Array();
    for(var i=0; i<12; i++){
        tempObj = new Object();
        tempObj["period"] = months[i];
        tempObj["Input"] = 0;
        tempObj["Output"] = 0;
        data.push(tempObj);
    }
    var LENGTH = result.length;
    for(var i=0; i<LENGTH; i++){
          var timeObj = timeConverter(parseInt(result[i]["timestamp"]));
          //console.log(timeObj);
          if(result[i]["mode"]==="I"){
            data[months.indexOf(timeObj["month"])]["Input"]+=1;
          }
          else{
            data[months.indexOf(timeObj["month"])]["Output"]+=1;
          }
    }
    console.log(data);
    return data;
}
function makeQuery(packageType,periodType,periodName){
    var queryParams = new Object()
    if(packageType==="all"){
        if(periodType==="yearly"){
            var starttime = Date.parse("Jan 01, "+periodName+" 00:00:00")/1000;
            var endtime = Date.parse("Dec 31, "+periodName+" 23:59:59")/1000;
            queryParams["timestamp"] = new Object();
            queryParams["timestamp"]["$gte"] = starttime;
            queryParams["timestamp"]["$lte"] = endtime;
        }
        else if(periodType === "monthly"){
            periods = periodName.split("_");
            var monthPos = months.indexOf(periods[1]);
            var days = new Date(parseInt(periods[0]), monthPos+1, 0).getDate();
            var starttime = Date.parse(periods[1]+" 01, "+periods[0]+" 00:00:00")/1000;
            var endtime = Date.parse(periods[1]+" "+days+", "+periods[0]+" 23:59:59")/1000;
            queryParams["timestamp"] = new Object();
            queryParams["timestamp"]["$gte"] = starttime;
            queryParams["timestamp"]["$lte"] = endtime;
        }
    }
    else if(packageType==="metadata"){
        if(periodType==="yearly"){
            queryParams["path"] = {$not:/.deb/};
            var starttime = Date.parse("Jan 01, "+periodName+" 00:00:00")/1000;
            var endtime = Date.parse("Dec 31, "+periodName+" 23:59:59")/1000;
            queryParams["timestamp"] = new Object();
            queryParams["timestamp"]["$gte"] = starttime;
            queryParams["timestamp"]["$lte"] = endtime;
        }
        else if(periodType === "monthly"){
            match["path"] = {$not:/.deb/};
            periods = periodName.split("_");
            var monthPos = months.indexOf(periods[1]);
            var days = new Date(parseInt(periods[0]), monthPos+1, 0).getDate();
            var starttime = Date.parse(periods[1]+" 01, "+periods[0]+" 00:00:00")/1000;
            var endtime = Date.parse(periods[1]+" "+days+", "+periods[0]+" 23:59:59")/1000;
            queryParams["timestamp"] = new Object();
            queryParams["timestamp"]["$gte"] = starttime;
            queryParams["timestamp"]["$lte"] = endtime;
        }
    }
    else if(packageType==="package"){
        if(periodType==="yearly"){
            queryParams["path"] = /.deb/;
            var starttime = Date.parse("Jan 01, "+periodName+" 00:00:00")/1000;
            var endtime = Date.parse("Dec 31, "+periodName+" 23:59:59")/1000;
            queryParams["timestamp"] = new Object();
            queryParams["timestamp"]["$gte"] = starttime;
            queryParams["timestamp"]["$lte"] = endtime;
        }
        else if(periodType === "monthly"){
            queryParams["path"] = /.deb/;
            periods = periodName.split("_");
            var monthPos = months.indexOf(periods[1]);
            var days = new Date(parseInt(periods[0]), monthPos+1, 0).getDate();
            var starttime = Date.parse(periods[1]+" 01, "+periods[0]+" 00:00:00")/1000;
            var endtime = Date.parse(periods[1]+" "+days+", "+periods[0]+" 23:59:59")/1000;
            queryParams["timestamp"] = new Object();
            queryParams["timestamp"]["$gte"] = starttime;
            queryParams["timestamp"]["$lte"] = endtime;
        }
    }
    return queryParams;
}
router.get('/:charttype=?/:urldata=?',function(req,res,next){
    var charttype = req.params.charttype;
    var urldata = req.params.urldata;
    var packageType = "";
    var periodType = "";
    var periodName = "";
    var param = urldata.split("_");
    if(param.length==2){
        periodType = "yearly";
        packageType = param[1];
        periodName = param[0];
    }
    else if(param.length==3){
        periodType = "monthly";
        packageType = param[2];
        periodName = param[0]+"_"+param[1];
    }
    var queryParams = makeQuery(packageType,periodType,periodName);
    Logs.find(queryParams,
      function(err,result){
        var jsonData = undefined;
        if(periodType==="yearly"){
            jsonData = createYearlyData(result);
        }
        else if(periodType==="monthly"){
            var param = urldata.split("_");
            jsonData = createMonthlyData(result,parseInt(param[0]),param[1]);
        }
        res.json(jsonData);
      });
});
module.exports = router;
