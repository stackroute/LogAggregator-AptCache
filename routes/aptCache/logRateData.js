var express = require('express');
var fs = require('fs');
var router = express.Router();

var Logs = require('../../models/dbConfig').aptLogModel;


var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function createMonthlyData(result,year,month){
    data = new Array();
    monthPos = months.indexOf(month);
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
          if(result[i]["_id"]["Type"]==="I"){
            data[result[i]["_id"]["period"]-1]["Input"]+=result[i]["count"];
          }
          else{
            data[result[i]["_id"]["period"]-1]["Output"]+=result[i]["count"];
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
          if(result[i]["_id"]["Type"]==="I"){
            data[months.indexOf(result[i]["_id"]["period"])]["Input"]+=result[i]["count"];
          }
          else{
            data[months.indexOf(result[i]["_id"]["period"])]["Output"]+=result[i]["count"];
          }
    }
    return data;
}
function makeQuery(packageType,periodType,periodName){
    var groupParams = new Array();
    var match = new Object();
    var group = new Object();
    if(packageType==="all"){
        if(periodType==="yearly"){
            match["year"]=parseInt(periodName);
            group["period"] = "$month";
            group["Type"] = "$mode";
        }
        else if(periodType === "monthly"){
            periods = periodName.split("_");
            match["year"]=parseInt(periods[0]);
            match["month"]=periods[1];
            group["period"] = "$date";
            group["Type"] = "$mode";
        }
    }
    else if(packageType==="metadata"){
        if(periodType==="yearly"){
            match["year"]=parseInt(periodName);
            match["download"] = {$not:/.deb/};
            group["period"] = "$month";
            group["Type"] = "$mode";
        }
        else if(periodType === "monthly"){
            periods = periodName.split("_");
            match["year"]=parseInt(periods[0]);
            match["month"]=periods[1];
            match["download"] = {$not:/.deb/};
            group["period"] = "$date";
            group["Type"] = "$mode";
        }
    }
    else if(packageType==="package"){
        if(periodType==="yearly"){
            match["year"]=parseInt(periodName);
            match["download"] = /.deb/;
            group["period"] = "$month";
            group["Type"] = "$mode";
        }
        else if(periodType === "monthly"){
            periods = periodName.split("_");
            match["year"]=parseInt(periods[0]);
            match["month"]=periods[1];
            match["download"] = /.deb/;
            group["period"] = "$date";
            group["Type"] = "$mode";
        }
    }
    groupParams.push(match);
    groupParams.push(group);
    return groupParams;
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
    Logs.aggregate([
      {$match:queryParams[0]},
      {$group:{_id: queryParams[1],count:{$sum:1}}}],
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
