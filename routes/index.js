var express = require('express');
var fs = require('fs');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' ,navClass1:"active" ,navClass2:"" ,navClass3:"" ,navClass4:"" ,navClass5:"" ,navClass6:""});
});

router.get('/requestrate', function(req, res, next) {
  res.render('allLogs', { title: 'All Logs' ,navClass1:"" ,navClass2:"active" ,navClass3:"" ,navClass4:"" ,navClass5:"" ,navClass6:""});
});

router.get('/requestdata', function(req, res, next) {
  res.render('allData', { title: 'All Data' ,navClass1:"" ,navClass2:"" ,navClass3:"active" ,navClass4:"" ,navClass5:"" ,navClass6:""});
});

router.get('/packagecount', function(req, res, next) {
  res.render('package', { title: 'Package Count' ,navClass1:"" ,navClass2:"" ,navClass3:"" ,navClass4:"active" ,navClass5:"" ,navClass6:""});
});

router.get('/packageanalytics', function(req, res, next) {
  res.render('packageAnalytics', { title: 'Package Analytics' ,navClass1:"" ,navClass2:"" ,navClass3:"" ,navClass4:"" ,navClass5:"active" ,navClass6:""});
});

router.get('/packagerepository', function(req, res, next) {
  res.render('packageRepository', { title: 'Package Repository' ,navClass1:"" ,navClass2:"" ,navClass3:"" ,navClass4:"" ,navClass5:"" ,navClass6:"active"});
});

module.exports = router;
