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

This code is written by Prateek Reddy Yammanuru, Shiva Manognya Kandikuppa, Uday Kumar Mydam, Nirup TNL, Sandeep Reddy G, Deepak Kumar*/

var express = require('express');
var path = require('path');
var router = express.Router();
var Log = require('../../models/dbConfig.js').serverModel;

/* GET home page. */
router.get('/:year/:month', function(req, res, next) {

  var year = req.params.year;
  var month = req.params.month;
  var fromDate, toDate;
  if(month == "0") {
    fromDate = new Date(year, 0);
    toDate = new Date(parseInt(year)+1, 0);
  } else {
    fromDate = new Date(year, parseInt(month)-1);
    toDate = new Date(year, parseInt(month));
  }
  var finalData = [];
  var accumulator = {};
  var dates = {};
  Log.find({time : {"$gte": fromDate, "$lt": toDate}}, 'method time', function(err, serverHits) {
    for(i in serverHits)
    {
      var obj = {};
      day_date = (serverHits[i].time).toISOString().substring(0, 10);
      if(dates[day_date])
      {
        accumulator[day_date][serverHits[i].method]+= 1;
      }
      else
      {
        dates[day_date] = 1;
        obj.date = day_date;
        obj.GET = 0;
        obj.POST = 0;
        obj.OPTIONS = 0;
        obj.HEAD = 0;
        obj[serverHits[i].method] = 1;
        accumulator[day_date] = obj;
      }
    }

    finalData.push(dates);
    finalData.push(accumulator);
    res.json(finalData);
  });
});
module.exports = router;
