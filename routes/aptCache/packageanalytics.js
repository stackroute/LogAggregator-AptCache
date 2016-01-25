var express = require('express');
var fs = require('fs');
var router = express.Router();
var Logs = require('../../model/logSchema');
function makeQuery(period){
    var match = new Object();
    dataRange = period.split('_');
    if(dataRange.length===1){
        match["year"]=parseInt(dataRange[0]);
    }
    else if(dataRange.length===2){
        match["year"]=parseInt(dataRange[0]);
        match["month"]=dataRange[1];
    }
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
router.get('/package/:packinfo=?/:period=?',function(req,res,next){
    var packinfo = req.params.packinfo;
    var period = req.params.period;
    if(packinfo === "package_bz2_info"){
        var matchParam = makeQuery(period);
        Logs.aggregate([{$match:matchParam},{$group:{_id: {"download":"$download"},count:{$sum:1}}}],function(err,result){
            jsonData = createData(result);
            res.json(jsonData);
        });
    }
});
module.exports = router;
