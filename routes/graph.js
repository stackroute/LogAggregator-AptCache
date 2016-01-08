var express = require('express');
var fs = require('fs');
var router = express.Router();
var User = require('../model/schema');

router.get('/:charttype=?/:packagetype=?/:datename=?',function(req,res,next){
  var charttype = req.params.charttype;
  var packagetype = req.params.packagetype;
  var datename = req.params.datename;
  if(charttype==="rate")
  {
      if(packagetype==="all")
      {
          sp = datename.split('_');
          if(sp[0]==="monthwise")
          {
            var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            data = new Array();
            for(var i=0; i<12; i++)
            {
                tempObj = new Object();
                tempObj["period"] = month[i];
                tempObj["Input"] = 0;
                tempObj["Output"] = 0;
                data.push(tempObj);
            }
            User.aggregate([{$group:{_id: {"period":"$month","Type":"$mode"},count:{$sum:1}}}],function(err,result){

                  for(var i=0; i<result.length; i++)
                  {
                      if(result[i]["_id"]["Type"]==="I")
                      {
                          data[month.indexOf(result[i]["_id"]["period"])]["Input"]+=result[i]["count"];
                      }

                      else
                      {
                          data[month.indexOf(result[i]["_id"]["period"])]["Output"]+=result[i]["count"];
                      }
                  }
                  //console.log(data);

                  res.send(JSON.stringify(data));
              });

          }
          else
          {
              var odd = ["Jan","Mar","May","Jul","Aug","Oct","Dec"];
              var even = ["Apr","Jun","Sep","Nov"];
              data = new Array();
              if(odd.indexOf(sp[0]) > -1)
              {
                  for(var i=1; i<32; i++)
                  {
                      tempObj = new Object();
                      tempObj["period"] = i;
                      tempObj["Input"] = 0;
                      tempObj["Output"] = 0;
                      data.push(tempObj);
                  }
              }
              else if(even.indexOf(sp[0]) > -1)
              {
                  for(var i=1; i<31; i++)
                  {
                      tempObj = new Object();
                      tempObj["period"] = i;
                      tempObj["Input"] = 0;
                      tempObj["Output"] = 0;
                      data.push(tempObj);
                  }
              }
              else
              {
                  for(var i=0; i<30; i++)
                  {
                      tempObj = new Object();
                      tempObj["period"] = i;
                      tempObj["Input"] = 0;
                      tempObj["Output"] = 0;
                      data.push(tempObj);
                  }
              }
              User.aggregate([{$match:{"year":2015,"month":sp[0]}},{$group:{_id: {"period":"$date","Type":"$mode"},count:{$sum:1}}}],function(err,result){
                for(var i=0; i<result.length; i++)
                {
                    if(result[i]["_id"]["Type"]==="I")
                    {
                        data[result[i]["_id"]["period"]-1]["Input"]+=result[i]["count"];
                    }

                    else
                    {
                        data[result[i]["_id"]["period"]-1]["Output"]+=result[i]["count"];
                    }
                }
                res.send(JSON.stringify(data));
              });
          }
      }

      else if(packagetype === "metadata")
      {
          sp = datename.split('_');
          if(sp[0]==="monthwise")
          {
            var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            data = new Array();
            for(var i=0; i<12; i++)
            {
                tempObj = new Object();
                tempObj["period"] = month[i];
                tempObj["Input"] = 0;
                tempObj["Output"] = 0;
                data.push(tempObj);
            }
            User.aggregate([{$match:{"year":2015,"download":{$not:/.deb/}}},{$group:{_id: {"period":"$month","Type":"$mode"},count:{$sum:1}}}],function(err,result){
              for(var i=0; i<result.length; i++)
              {
                  if(result[i]["_id"]["Type"]==="I")
                  {
                      data[month.indexOf(result[i]["_id"]["period"])]["Input"]+=result[i]["count"];
                  }

                  else
                  {
                      data[month.indexOf(result[i]["_id"]["period"])]["Output"]+=result[i]["count"];
                  }
              }
              //console.log(data);

              res.send(JSON.stringify(data));
            });
          }
          else
          {
              var odd = ["Jan","Mar","May","Jul","Aug","Oct","Dec"];
              var even = ["Apr","Jun","Sep","Nov"];
              data = new Array();
              if(odd.indexOf(sp[0]) > -1)
              {
                  for(var i=1; i<32; i++)
                  {
                      tempObj = new Object();
                      tempObj["period"] = i;
                      tempObj["Input"] = 0;
                      tempObj["Output"] = 0;
                      data.push(tempObj);
                  }
                }
                else if(even.indexOf(sp[0]) > -1)
                {
                  for(var i=1; i<31; i++)
                  {
                      tempObj = new Object();
                      tempObj["period"] = i;
                      tempObj["Input"] = 0;
                      tempObj["Output"] = 0;
                      data.push(tempObj);
                  }
                }
                else
                {
                  for(var i=1; i<30; i++)
                  {
                      tempObj = new Object();
                      tempObj["period"] = i;
                      tempObj["Input"] = 0;
                      tempObj["Output"] = 0;
                      data.push(tempObj);
                  }
                }
                User.aggregate([{$match:{"year":2015,"month":sp[0],"download":{$not:/.deb/}}},{$group:{_id: {"period":"$date","Type":"$mode"},count:{$sum:1}}}],function(err,result){
                  for(var i=0; i<result.length; i++)
                  {
                      if(result[i]["_id"]["Type"]==="I")
                      {
                          data[result[i]["_id"]["period"]-1]["Input"]+=result[i]["count"];
                      }

                      else
                      {
                          data[result[i]["_id"]["period"]-1]["Output"]+=result[i]["count"];
                      }
                  }
                  res.send(JSON.stringify(data));
                });

          }
      }
      else if(packagetype === "package")
      {
          sp = datename.split('_');
          if(sp[0]==="monthwise")
          {
            var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            data = new Array();
            for(var i=0; i<12; i++)
            {
                tempObj = new Object();
                tempObj["period"] = month[i];
                tempObj["Input"] = 0;
                tempObj["Output"] = 0;
                data.push(tempObj);
            }
            User.aggregate([{$match:{"year":2015,"download":/.deb/}},{$group:{_id: {"period":"$month","Type":"$mode"},count:{$sum:1}}}],function(err,result){
              for(var i=0; i<result.length; i++)
              {
                  if(result[i]["_id"]["Type"]==="I")
                  {
                      data[month.indexOf(result[i]["_id"]["period"])]["Input"]+=result[i]["count"];
                  }

                  else
                  {
                      data[month.indexOf(result[i]["_id"]["period"])]["Output"]+=result[i]["count"];
                  }
              }
              //console.log(data);

              res.send(JSON.stringify(data));
            });
          }
          else
          {
              var odd = ["Jan","Mar","May","Jul","Aug","Oct","Dec"];
              var even = ["Apr","Jun","Sep","Nov"];
              data = new Array();
              if(odd.indexOf(sp[0]) > -1)
              {
                  for(var i=1; i<32; i++)
                  {
                      tempObj = new Object();
                      tempObj["period"] = i;
                      tempObj["Input"] = 0;
                      tempObj["Output"] = 0;
                      data.push(tempObj);
                  }
                }
                else if(even.indexOf(sp[0]) > -1)
                {
                  for(var i=1; i<31; i++)
                  {
                      tempObj = new Object();
                      tempObj["period"] = i;
                      tempObj["Input"] = 0;
                      tempObj["Output"] = 0;
                      data.push(tempObj);
                  }
                }
                else
                {
                  for(var i=1; i<30; i++)
                  {
                      tempObj = new Object();
                      tempObj["period"] = i;
                      tempObj["Input"] = 0;
                      tempObj["Output"] = 0;
                      data.push(tempObj);
                  }
                }
                User.aggregate([{$match:{"year":2015,"month":sp[0],"download":/.deb/}},{$group:{_id: {"period":"$date","Type":"$mode"},count:{$sum:1}}}],function(err,result){
                  for(var i=0; i<result.length; i++)
                  {
                      if(result[i]["_id"]["Type"]==="I")
                      {
                          data[result[i]["_id"]["period"]-1]["Input"]+=result[i]["count"];
                      }

                      else
                      {
                          data[result[i]["_id"]["period"]-1]["Output"]+=result[i]["count"];
                      }
                  }
                  res.send(JSON.stringify(data));
                });

          }
      }

  }
//  res.send(data.toString());
});

module.exports = router;
