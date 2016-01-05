var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/reqrate', function(req, res, next) {
 res.render('allLogs', { title: 'AllLogs' });
});

router.get('/reqdata', function(req, res, next) {
 res.render('allData', { title: 'AllData' });
});
router.get('/package', function(req, res, next) {
 res.render('package', { title: 'Package' });
});
router.get('/package_bz2', function(req, res, next) {
 res.render('package_bz2', { title: 'Package bz2' });
});
router.get('/package_repo', function(req, res, next) {
 res.render('package_repo', { title: 'Package Repo' });
});

router.get('/:param=?/:param1=?',function(req,res,next){
  var param = req.params.param;
  var param1 = req.params.param1;
  var data = fs.readFileSync('./public/json/'+param+'/'+param1+'.json');
  res.send(data.toString());
});

router.get('/:param=?/:param1=?/:param2=?',function(req,res,next){
  var param = req.params.param;
  var param1 = req.params.param1;
  var param2 = req.params.param2;
  var data = fs.readFileSync('./public/json/'+param+'/'+param1+'/'+param2+'.json');
  res.send(data.toString());
});

module.exports = router;
