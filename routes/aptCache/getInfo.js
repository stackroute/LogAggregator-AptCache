var express = require('express');
var fs = require('fs');
var router = express.Router();
router.get('/initInfo',function(req,res,next){
  
    var data = fs.readFileSync('public/json/info.json');
      var jsonData = JSON.parse(data);
      var today = new Date();
      var mm = today.getMonth();
      var yyyy = today.getFullYear();
      jsonData["currentYear"] = yyyy;
      jsonData["currentMonth"] = jsonData["months"][mm];
      res.json(jsonData);

});
module.exports = router;
