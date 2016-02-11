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

angular.module('aptLogApp').controller("packageCountController",function($scope, $http, ajaxService){
  $scope.requiredYear = 2015;
  $scope.requiredMonth = "";
  $scope.tab=1;
  $scope.tableData = {};
  $scope.packageHeader=["SI No", "Package Name", "Package Version", "Package Architecture", "Count"]
  $scope.info = {};
  $scope.msg="";
  $scope.setMonth = function(monthValue){
    $scope.requiredMonth = monthValue;
  }

  $scope.setYear = function(yearValue){
    $scope.requiredYear = yearValue;
  }

  $scope.initializeVars = function(isMonth){
    var urlData = "";
    if(isMonth===true){
      urlData = "true";
    }
    else{
      urlData = "false";
    }
    ajaxService.ajaxCall("getInfoTable",urlData,$http,$scope);

  };
  $scope.writeTable = function(year,month){
      $scope.requiredYear = year;
      $scope.requiredMonth = month;
      if($scope.requiredMonth===""){
        ajaxService.ajaxCall("packageCount",$scope.requiredYear,$http,$scope);
      }
      else{
        ajaxService.ajaxCall("packageCount",$scope.requiredYear+"_"+$scope.requiredMonth,$http,$scope);
      }
  };

  $scope.setTab = function(tabVal){
      $scope.tab=tabVal;
  };
});
