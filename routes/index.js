var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/requestrate', function(req, res, next) {
  res.render('allLogs', { title: 'All Logs' });
});

router.get('/requestdata', function(req, res, next) {
  res.render('allData', { title: 'All Data' });
});

router.get('/packagecount', function(req, res, next) {
  res.render('package', { title: 'Package Count' });
});

router.get('/packageanalytics', function(req, res, next) {
  res.render('package_bz2', { title: 'Package Analytics' });
});

router.get('/packagerepository', function(req, res, next) {
  res.render('package_repo', { title: 'Package Repository' });
});

router.get('/:charttype=?/:datename=?',function(req,res,next){
  var charttype = req.params.charttype;
  var datename = req.params.datename;
  var data = fs.readFileSync('./public/json/'+charttype+'/'+datename+'.json');
  res.send(data.toString());
});

router.get('/:charttype=?/:packagetype=?/:datename=?',function(req,res,next){
  var charttype = req.params.charttype;
  var packagetype = req.params.packagetype;
  var datename = req.params.datename;
  var data = fs.readFileSync('./public/json/'+charttype+'/'+packagetype+'/'+datename+'.json');
  res.send(data.toString());
});

module.exports = router;
