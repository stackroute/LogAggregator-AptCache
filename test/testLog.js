var express = require('express');
var chai = require('chai');
var expect = require('chai').expect;
var superTest = require('supertest');
var url = superTest("http://localhost:8080");
var app = require("../app");

describe("testing packageCount route",function(err){
  it("should return Pckage count data with json datatype",function(done){
    url
      .get("/packagecount/year/year_month/2015")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        // console.log("*******************",res.text);
        var myObj = JSON.parse(res.text);
        // console.log("*******************"+myObj[0]);
        console.log(myObj[0]["Package Version"]);
        expect(myObj[0]["Package Version"]).to.equal("1.2.50-1ubuntu2.14.04.1");
        console.log(myObj[0]["Package Version"]);
        done();
      })
  })
})
describe("testing packageCount route",function(err){
  it("should return Pckage count data with json datatype",function(done){
    url
      .get("/dataRateData/size/all/2015/monthwise")
      .expect(200)
      .expect("Content type",/json/)
      .end(function(err, res){
        // console.log("*******************",res.text);
        var myObj = JSON.parse(res.text);
        // console.log("*******************"+myObj[0]);
        console.log(myObj[11]["Input"]);
        expect(myObj[11]["Input"]).to.equal(191697559);

        done();
      })
  })
})
