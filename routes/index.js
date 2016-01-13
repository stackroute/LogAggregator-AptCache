var express = require('express');
var fs = require('fs');
var app = express();
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
  res.render('packageAnalytics', { title: 'Package Analytics' });
});

router.get('/packagerepository', function(req, res, next) {
  res.render('packageRepository', { title: 'Package Repository' });
});

module.exports = router;
