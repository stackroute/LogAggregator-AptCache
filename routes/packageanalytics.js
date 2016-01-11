var express = require('express');
var fs = require('fs');
var router = express.Router();
var User = require('../model/schema');
router.get('/package/:packinfo=?/:period=?',function(req,res,next){
    var packinfo = req.params.packinfo;
    var period = req.params.period;
    if(packinfo === "package_bz2_info")
    {
        if(period==="packages_all")
        {
            var data = new Object();
            User.aggregate([{$match:{"mode":"I","download":/Packages.bz2/}},{$group:{_id: {"download":"$download"},count:{$sum:1}}}],function(err,result){
                for(var i=0; i<result.length; i++)
                {
                  var arr = result[i]["_id"]["download"].split('/');
                  var os = "";
                  var len = arr.length;
                  if(arr[0]==="security.debian.org")
                  {
                      os = arr[2].split('-');
                  }
                  else
                  {
                      os = arr[len-4].split('-');
                  }
                  if(data[arr[0]]==undefined)
                  {
                      data[arr[0]] = new Object();
                      data[arr[0]][os[0]] = new Object();
                      data[arr[0]][os[0]]["count"] = 1;
                  }
                  else if(data[arr[0]][os[0]]==undefined)
                  {
                      data[arr[0]][os[0]] = new Object();
                      data[arr[0]][os[0]]["count"] = 1;
                  }
                  else
                  {
                      data[arr[0]][os[0]]["count"]+=result[i]["count"];
                  }
                }

                res.send(JSON.stringify(data));
            });
        }
        else if(period==="packages_monthly")
        {
          var data = new Object();
          User.aggregate([{$match:{"mode":"I","download":/Packages.bz2/}},{$group:{_id: {"month":"$month","download":"$download"},count:{$sum:1}}}],function(err,result){
              for(var i=0; i<result.length; i++)
              {
                var arr = result[i]["_id"]["download"].split('/');
                var os = "";
                var len = arr.length;
                if(arr[0]==="security.debian.org")
                {
                    os = arr[2].split('-');
                }
                else
                {
                    os = arr[len-4].split('-');
                }
                if(data[result[i]["_id"]["month"]] == undefined)
                {
                    data[result[i]["_id"]["month"]] = new Object();
                    data[result[i]["_id"]["month"]][arr[0]] = new Object();
                    data[result[i]["_id"]["month"]][arr[0]][os[0]] = new Object();
                    data[result[i]["_id"]["month"]][arr[0]][os[0]]["count"] = 1;

                }
                else if(data[result[i]["_id"]["month"]][arr[0]] == undefined)
                {
                    data[result[i]["_id"]["month"]][arr[0]] = new Object();
                    data[result[i]["_id"]["month"]][arr[0]][os[0]] = new Object();
                    data[result[i]["_id"]["month"]][arr[0]][os[0]]["count"] = 1;
                }
                else if(data[result[i]["_id"]["month"]][arr[0]][os[0]] == undefined)
                {
                    data[result[i]["_id"]["month"]][arr[0]][os[0]] = new Object();
                    data[result[i]["_id"]["month"]][arr[0]][os[0]]["count"] = 1;
                }
                else
                {
                    data[result[i]["_id"]["month"]][arr[0]][os[0]]["count"]+=result[i]["count"];
                }
              }
              res.send(JSON.stringify(data));
          });
        }
        else if(period==="packages_daily")
        {
          var data = new Object();
          User.aggregate([{$match:{"mode":"I","download":/Packages.bz2/}},{$group:{_id: {"month":"$month","date":"$date","download":"$download"},count:{$sum:1}}}],function(err,result){
            for(var i=0; i<result.length; i++)
            {
              var arr = result[i]["_id"]["download"].split('/');
              var os = "";
              var len = arr.length;
              if(arr[0]==="security.debian.org")
              {
                  os = arr[2].split('-');
              }
              else
              {
                  os = arr[len-4].split('-');
              }
              if(data[result["_id"]["month"]] == undefined)
              {
                  data[result[i]["_id"]["month"]] = new Object();
                  data[result[i]["_id"]["month"]][result["_id"]["date"]] = new Object();
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]] = new Object();
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]][os[0]] = new Object();
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]][os[0]]["count"] = 1;
              }
              else if (data[result[i]["_id"]["month"]][result["_id"]["date"]] == undefined)
              {
                  data[result[i]["_id"]["month"]][result["_id"]["date"]] = new Object();
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]] = new Object();
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]][os[0]] = new Object();
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]][os[0]]["count"] = 1;
              }
              else if(data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]] == undefined)
              {
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]] = new Object();
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]][os[0]] = new Object();
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]][os[0]]["count"] = 1;
              }
              else if(data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]][os[0]] == undefined)
              {
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]][os[0]] = new Object();
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]][os[0]]["count"] = 1;
              }
              else
              {
                  data[result[i]["_id"]["month"]][result["_id"]["date"]][arr[0]][os[0]]["count"]+=result[i]["count"];
              }
            }

            res.send(JSON.stringify(data));
          });
        }

    }
});
module.exports = router;
