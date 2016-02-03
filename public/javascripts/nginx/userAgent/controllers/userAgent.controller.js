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

This code is written by Prateek Reddy Yammanuru, Shiva Manognya Kandikuppa, Uday Kumar Mydam, Nirup TNL, Sandeep Reddy G, Deepak Kumar*/

angular.module('logAggregator').controller('userAgentController', ['$scope', "$cookies",'$rootScope','$location','agentDataService', '$interval',
  function($scope,$cookies, $rootScope,$location, agentDataService, $interval) {

    if($cookies.get('login')==='true'){

      var result=document.getElementsByClassName('homepage');
      angular.element(result).css('display','block');
    var thisYear = (new Date).getFullYear();
    $scope.$parent.tab = 'agentAnalytics';
    $scope.agentYear = thisYear;
    var years = [];
    for(var i = parseInt(thisYear); i > thisYear - $scope.config.noOfYears; i--) {
      years.push(i);
    }
    $scope.yearsToShow = years;
    $scope.agentMonth = 0;
    $scope.agentMonthName = "Month";
    $scope.agentData = {};
    $scope.showAgentProgress = true;

    var handleSuccess = function(response, criteria) {
      $scope.agentData = response.data;
      $scope.showAgentProgress = false;
    };

    var handleError = function(response, criteria) {
      $scope.agentData = undefined;
      $scope.showAgentProgress = false;
    }

    var onComplete =function() {
      var tabListener = $scope.$parent.$watch("tab", function() {
        if($scope.$parent.tab != 'agentAnalytics') {
          $interval.cancel(off);
          tabListener();
        }
      });
      var off = $interval(function() {
        if($scope.$parent.tab == 'agentAnalytics') {
          agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, $scope.agentYear, $scope.agentMonth);
        }
      }, $scope.config.refreshInterval);

    };

    $scope.agentCriteria = 'browser';
    agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, $scope.agentYear, $scope.agentMonth, onComplete);

    $scope.renderData = function(criteria) {
      $scope.showAgentProgress = true;
      $scope.agentCriteria = criteria;
      var year = $scope.agentYear;
      var month = $scope.agentMonth;
      agentDataService.getAgentData(handleSuccess, handleError, criteria, year, month);
    }

    $scope.updateAgentYear = function(year) {
      $scope.showAgentProgress = true;
      $scope.agentYear = year;
      $scope.agentMonth = 0;
      $scope.agentMonthName = 'Month';
      agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, year, $scope.agentMonth);
    }

    $scope.updateAgentMonth=function(month){
      $scope.showAgentProgress = true;
      $scope.agentMonth = month.value;
      $scope.agentMonthName = month.month;
      agentDataService.getAgentData(handleSuccess, handleError, $scope.agentCriteria, $scope.agentYear, $scope.agentMonth);
    }

    $scope.checkIfDisable = function(){
      if($scope.agentData)
        return (Object.keys($scope.agentData).length == 0 && $scope.agentMonth == 0)
    }
  }

  else{
    $location.path('/');
  }
  }
]);
