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

angular.module('aptLogApp').controller("repositoryController",function($scope,$http,ajaxService){
    $scope.requiredYear = 2015;
    $scope.mode = "Input";
    $scope.tableData = {};
    $scope.info = {};
    $scope.msg="";

    $scope.initializeVars = function(){
      ajaxService.ajaxCall("getRepoTable","Input",$http,$scope);

    };
    $scope.writeTable = function(year,mode){
        $scope.requiredYear = year;
        $scope.mode = mode;
        ajaxService.ajaxCall("repository","/"+year+"/"+mode,$http,$scope);
    };

});
