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

var dropDownElement=angular.module("dropDownElement",[]);
dropDownElement.controller('dropController',function($scope)
{
  $scope.display = true;
  $scope.actionFunction = function(){}
});
dropDownElement.directive('dropMonth',function(){
  return {
    restrict:'E',
    templateUrl:'directives/html/aptCache/dropMonth.html'
  }
});

dropDownElement.directive('dropYear', function(){
  return {
    restrict: 'E',
    templateUrl:'directives/html/aptCache/dropYear.html'
  };
});


dropDownElement.directive('radioFilter',function(){
  return {
    restrict:'E',
    templateUrl:'directives/html/aptCache/radioFilter.html'
  };
});
dropDownElement.directive('dropdownMode', function(){
  return {
    restrict: 'E',
    templateUrl:'directives/html/aptCache/dropMode.html'
  };
});
