var sinon = require('sinon');
var express = require('express');
var chai = require('chai');
var expect = require('chai').expect;
var superTest = require('supertest');
var app = require("../bin/www");

var url = superTest("http://localhost:8080");
var logSchema = require('../models/dbConfig.js').aptLogModel;


var mStub = sinon.stub(logSchema, 'aggregate');

describe("testing packageCount route",function(err){

  beforeEach(function(){
    var argvalue = [{$match:{mode:"O",year:2015,month:"Oct","download":{$regex:".deb$"}}},{$group:{_id: {package:"$download"},count:{$sum:1}}}];
    var yieldValue = [{ "_id" : { "package" : "uburep/pool/universe/f/fsplib/jishnu_0.11-2_i386.deb" }, "count" : 1 }];
    mStub.withArgs(argvalue).yields(null,yieldValue);
    // mStub.yields(null,yieldValue);

  });

  it('should retrieve data', function(done){
    url
       .get("/packagecount/year/year_month/2015_Oct")
       .expect(200)
       .end(function(err, res){
          var myObj = JSON.parse(res.text);
          expect(myObj[0]["Package Name"]).to.equal("jishnu");
          done();
       })
  });
})
