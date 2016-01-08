var express = require('express');
var fs = require('fs');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/LogAggregate');
var User = require('../model/schema');
//console.log(User);
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
          else if(sp[0]===)
      }
  }
//  res.send(data.toString());
});

module.exports = router;
