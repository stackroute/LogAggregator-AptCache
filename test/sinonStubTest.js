var sinon = require('sinon');
var express = require('express');
var chai = require('chai');
var expect = require('chai').expect;
var superTest = require('supertest');
var app = require("../bin/www");

var url = superTest("http://localhost:8080");
var logSchema = require('../models/dbConfig.js').aptLogModel;

describe("Testing Datarate  Route --",function(err){
   this.timeout(20000);
  it("should return monthwise data rate for spacified year with json datatype",function(done){
    url
      .get("/dataRateData/size/2016_all")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[1]["Input"]).to.equal(31841926);

        done();
      })
  })

//****************************************************************
//*******************dataRate metadata*****************************

  it("should return monthwise data rate(metadata) for spacified year with json datatype",function(done){
    url
      .get("/dataRateData/size/2016_metadata")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[1]["Output"]).to.equal(181631725);

        done();
      })
  })

//****************************************************************************
//*******************dataRate packages*****************************

  it("should return monthwise data rate (packagewise) spacified year with json datatype",function(done){
    url
      .get("/dataRateData/size/2016_package")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[1]["Input"]).to.equal(547443);

        done();
      })
  })

//****************************************************************************
//*******************dataRate packages*****************************

  it("should return day wise data rate for selected month and year with json datatype",function(done){
    url
      .get("/dataRateData/size/2016_Feb_all")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[10]["Output"]).to.equal(182037894);

        done();
      })
  })

//****************************************************************************
//*******************dataRate packages*****************************

  it("should return day wise data rate(metadata) for selected month and year with json datatype",function(done){
    url
      .get("/dataRateData/size/2016_Feb_metadata")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){

        var myObj = JSON.parse(res.text);
        expect(myObj[10]["Input"]).to.equal(31294483);

        done();
      })
  })

//****************************************************************************
//*******************dataRate packages*****************************

  it("should return day wise data rate(metadata) for selected month and year with json datatype",function(done){
    url
      .get("/dataRateData/size/2016_Feb_package")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){

        var myObj = JSON.parse(res.text);
        expect(myObj[10]["Output"]).to.equal(406169);
        done();
      })
  })
})
// *************************************************************************************************
// ****************************************************************************
// *******************Package repository route*****************************
describe("Testing package repository route -- ",function(err){
   this.timeout(20000);

      it("should return yearwise package details in table formate for the selected year",function(done){
        url
            .get("/repository/mode/2016/Input")
            .expect(200)
            .expect("Content type",/json/)
            .end(function(err, res){
              var myObj = JSON.parse(res.text);
              expect(myObj[0]["packageName"]).to.equal("aglfn");
              done();
            })
          })

          it("should return yearwise package details in table formate for the selected year",function(done){
            url
                .get("/repository/mode/2016/Output")
                .expect(200)
                .expect("Content type",/json/)
                .end(function(err, res){
                  var myObj = JSON.parse(res.text);
                  expect(myObj[0]["repository"]).to.equal("uburep");
                  done();
                })

})
})
//*************************LogRate data and PackageAnalytics route *************************************
describe("Testing LogRateData Routes Yearwise",function(err){
   this.timeout(200000);
  it("should return LogRate all data for the year 2016 with Json datatype",function(done){
    url
      .get("/logRateData/rate/2016_all")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[1]["period"]).to.equal("Feb");
        expect(myObj[1]["Input"]).to.equal(662);
        expect(myObj[1]["Output"]).to.equal(1351);
        done();
      })
  })
  it("should return LogRate metadata for the year 2016 with Json datatype",function(done){
    url
      .get("/logRateData/rate/2016_metadata")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[1]["period"]).to.equal("Feb");
        expect(myObj[1]["Input"]).to.equal(640);
        expect(myObj[1]["Output"]).to.equal(1309);
        done();
      })
  })
  it("should return LogRate packages data for the year 2016 with Json datatype",function(done){
    url
      .get("/logRateData/rate/2016_package")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){

        var myObj = JSON.parse(res.text);
        expect(myObj[1]["period"]).to.equal("Feb");
        expect(myObj[1]["Input"]).to.equal(22);
        expect(myObj[1]["Output"]).to.equal(42);

        done();
      })
  })
})
describe("Testing LogRateData Routes Monthwise",function(err){
     this.timeout(20000);
  it("should return LogRate all data for the year 2016 month October with Json datatype",function(done){
    url
      .get("/logRateData/rate/2016_Feb_all")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){

        var myObj = JSON.parse(res.text);
        expect(myObj[10]["period"]).to.equal(11);
        expect(myObj[10]["Input"]).to.equal(662);
        expect(myObj[10]["Output"]).to.equal(1351);

        done();
      })
  })
  it("should return LogRate metadata for the year 2016 month October with Json datatype",function(done){
    url
      .get("/logRateData/rate/2016_Feb_metadata")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[10]["period"]).to.equal(11);
        expect(myObj[10]["Input"]).to.equal(640);
        expect(myObj[10]["Output"]).to.equal(1309);
        done();
      })
  })
  it("should return LogRate packages data for the year 2016 month October with Json datatype",function(done){
    url
      .get("/logRateData/rate/2016_Feb_package")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[10]["period"]).to.equal(11);
        expect(myObj[10]["Input"]).to.equal(22);
        expect(myObj[10]["Output"]).to.equal(42);
        done();
      })
  })
})

describe("Testing PackageAnalytics Routes Yearwise",function(err){
   this.timeout(20000);
  it("should return PackageAnalytics data for the year 2016 with Json datatype",function(done){
    url
      .get("/packageanalytics/package/package_bz2_info/2016")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[1]["package"]).to.equal("security.ubuntu.com");
        expect(myObj[1]["os"]).to.equal("trusty");
        expect(myObj[1]["count"]).to.equal(151);
        done();
      })
  })
})

describe("Testing PackageAnalytics Routes Monthwise",function(err){
   this.timeout(20000);
  it("should return PackageAnalytics data for the year 2016, month February with Json datatype",function(done){
    url
      .get("/packageanalytics/package/package_bz2_info/2016_Feb")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[0]["package"]).to.equal("uburep");
        expect(myObj[0]["os"]).to.equal("trusty");
        expect(myObj[0]["count"]).to.equal(897);
        done();
      })
  })
})
//**************************packagecount route***************************************************
describe("Testing packageCount route Yearwise",function(err){
  it("should return Package count data yearwise with json datatype",function(done){
    url
      .get("/packagecount/year/year_month/2016")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[0]["Package Name"]).to.equal("aglfn");
        expect(myObj[0]["Package Version"]).to.equal("1.7-3");
        expect(myObj[0]["Package Architecture"]).to.equal("all");
        done();
      })
  })

  it("should return Package count data monthwise with json datatype",function(done){
    url
      .get("/packagecount/year/year_month/2016_Feb")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
          var myObj = JSON.parse(res.text);
          expect(myObj[0]["Package Name"]).to.equal("aglfn");
          expect(myObj[0]["Package Version"]).to.equal("1.7-3");
          expect(myObj[0]["Package Architecture"]).to.equal("all");
          done();
      })
  })
})



describe("Testing different Route using stub to fake mongo calls",function(err){
 this.timeout(20000);
  before(function(){

    var mStub_aggregate = sinon.stub(logSchema, 'aggregate');
    var mStub_find = sinon.stub(logSchema, 'find');

    var argvalue_datarate_all = {timestamp:{'$gte': 1451606400, '$lte': 1483228799 }};//2016 feb month
    var yieldvalue_datarate_all = [{"_id" : "56bc2b018634926707000001", "timestamp" : "1455172317", "mode" : "I", "size" : 8888, "host" : "172.23.238.253", "path" : "security.debian.org/stubtest", "time" : "2016-02-11T06:32:08Z"},
    { "_id" : "56bc2b018634926707000002", "timestamp" : "1455172317", "mode" : "I", "size" : 10000, "host" : "172.23.238.253", "path" : "security.debian.org/stubtest", "time" : "2016-02-11T06:32:08Z" }];


    var argvalue_datarate_package = {path:/.deb/,timestamp:{'$gte':1451606400,'$lte':1483228799 }};//2016 feb month package
    var yieldvalue_datarate_package = [{"_id" : "56bc2b018634926707000001", "timestamp" : 1455172317, "mode" : "O", "size" : 12345, "host" : "172.23.238.253", "path" : "security.debian.org/dists/jessie/updates/InRelease", "time" : "2016-02-11T06:32:08Z"}];


    var argvalue_package_repo_table = [{$match :{timestamp:{$gte:"1451606400" ,$lte:"1483228799"},
                                  path:{$regex:".deb$"},mode:"I"}},
                                  {$group:{_id:{filename:"$path"}}}];
    var yieldValue_package_repo_table = [{ "_id" : { "filename" : "uburep/pool/universe/a/aglfn/stubtest_stubtest.deb" } }];

    var argvalue_package_count=[{$match:{timestamp:{'$gte':'1451606400','$lte':'1483228799'},mode:'O',path:{'$regex':'.deb$'}}},{$group:{_id:{package:"$path"},count:{$sum:1}}}]
    var yieldValue_package_count=[{ "_id" : { "package" : "uburep/pool/universe/a/aglfn/stubtest_0.0.0_test.deb" }, "count" : 1 }];


//*****lograte******
    // var argvalue_lograte_all = {timestamp:{'$gte': 1451606400, '$lte': 1483228799 }};//2016 feb month
    // var yieldvalue_lograte_all = [{"_id" : "56bc2b018634926707000001", "timestamp" : "1455172317", "mode" : "I", "size" : 8888, "host" : "172.23.238.253", "path" : "security.debian.org/stubtest", "time" : "2016-02-11T06:32:08Z"},
    //     { "_id" : "56bc2b018634926707000002", "timestamp" : "1455172317", "mode" : "I", "size" : 10000, "host" : "172.23.238.253", "path" : "security.debian.org/stubtest", "time" : "2016-02-11T06:32:08Z" }];

//******package_analytics**********

var argvalue_package_analytics_table = [{$match:{ timestamp: { '$gte': '1451606400', '$lte': '1483228799' } }},
          {$group:{_id: {"download":"$path"},count:{$sum:1}}}];
var yieldValue_package_analytics_table = [{ "_id" : { "download" : "security.ubuntu.com/ubuntu/dists/wily-security/universe/i18n/Translation-en.bz2" }, "count" : 4 },
{ "_id" : { "download" : "security.ubuntu.com/ubuntu/dists/vivid-security/restricted/source/Sources.bz2" }, "count" : 10 },
{ "_id" : { "download" : "172.23.238.253/httpredir.debian.org/debian/dists/jessie/non-free/i18n/Translation-en.bz2" }, "count" : 2 },
{ "_id" : { "download" : "uburep/dists/trusty-backports/universe/i18n/Translation-en.bz2" }, "count" : 19 }
];



    mStub_find.withArgs(argvalue_datarate_all).yields(null,yieldvalue_datarate_all);
    mStub_find.withArgs(argvalue_datarate_package).yields(null,yieldvalue_datarate_package);
    mStub_aggregate.withArgs(argvalue_package_repo_table).yields(null,yieldValue_package_repo_table);
    mStub_aggregate.withArgs(argvalue_package_count).yields(null,yieldValue_package_count);
    mStub_aggregate.withArgs(argvalue_package_analytics_table).yields(null,yieldValue_package_analytics_table);

  });

  it('should retrieve data', function(done){
    url
       .get("/packageCount/year/year_month/2016")
       .expect(200)
       .end(function(err, res){
         var myObj = JSON.parse(res.text);
        expect(myObj[0]["Package Name"]).to.equal("stubtest");
          done();
       })
  });

  it("should return monthwise data rate for spacified year with json datatype",function(done){
    url
      .get("/dataRateData/size/2016_all")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
       var myObj = JSON.parse(res.text);
      expect(myObj[01]["Input"]).to.equal(18888);
        done();
      })
  })
    it("should return monthwise data rate (packagewise) spacified year with json datatype",function(done){
      url
        .get("/dataRateData/size/2016_package")
        .expect(200)
        .expect("Content type",/json/)
        .end(function(err, res){
          var myObj = JSON.parse(res.text);
          expect(myObj[01]["Output"]).to.equal(12345);
          done();
        })
    })
    //**********package by repo repo***************
    it("should return packagedetails by repo,pool etc for specified year and type(Input/Output)",function(done){
      url
        .get("/repository/mode/2016/Input")
        .expect(200)
        .expect("Content type",/json/)
        .end(function(err, res){
         var myObj = JSON.parse(res.text);
         expect(myObj[0]["packageName"]).to.equal('stubtest');
          done();
        })
    })

    //****************lograte test case***************
    it("should return lograte data for specified year with json datatype",function(done){
      url
        .get("/logRateData/rate/2016_all")
        .expect(200)
        .expect("Content type",/json/)
        .end(function(err, res){
          //same stub values are used as there in argvalue_datarate_all variable
        var myObj = JSON.parse(res.text);
        expect(myObj[1]["Input"]).to.equal(2);
          done();
        })
    })

    //*****************package_analytics*******************
    it("should return package_analytics data for specified year with json datatype",function(done){
      url
        .get("/packageanalytics/package/package_bz2_info/2016")
        .expect(200)
        .expect("Content type",/json/)
        .end(function(err, res){
        var myObj = JSON.parse(res.text);
        expect(myObj[0]["os"]).to.equal("vivid");
        expect(myObj[0]["count"]).to.equal(1);
          done();
        })
    })


})
