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
  res.render('package_bz2', { title: 'Package Analytics' ,navClass1:"" ,navClass2:"" ,navClass3:"" ,navClass4:"" ,navClass5:"active" ,navClass6:""});
});

router.get('/packagerepository', function(req, res, next) {
  res.render('package_repo', { title: 'Package Repository' ,navClass1:"" ,navClass2:"" ,navClass3:"" ,navClass4:"" ,navClass5:"" ,navClass6:"active"});
});

// router.get('/:charttype=?/:datename=?',function(req,res,next){
//   console.log("Hi");
//   var charttype = req.params.charttype;
//   var datename = req.params.datename;
//   var data = fs.readFileSync('./public/json/'+charttype+'/'+datename+'.json');
//   res.send(data.toString());
// });
//
// router.get('/:charttype=?/:packagetype=?/:datename=?',function(req,res,next){
//   var charttype = req.params.charttype;
//   var packagetype = req.params.packagetype;
//   var datename = req.params.datename;
//   var data = fs.readFileSync('./public/json/'+charttype+'/'+packagetype+'/'+datename+'.json');
//   res.send(data.toString());
// });

module.exports = router;
