var express = require('express');
var fs = require('fs');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/AptGet', function(req, res, next) {
  res.render('AptGet.ejs', { title: 'Apt-Get' });
});

module.exports = router;
