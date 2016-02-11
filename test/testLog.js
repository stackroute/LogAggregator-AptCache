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

This code is written by Ashish Gupta, Tarun Mohandas, Suriya Prakash, Srinivasa Burli, Jishnu Surendran and Bhairavi Balakrishnan*/

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
