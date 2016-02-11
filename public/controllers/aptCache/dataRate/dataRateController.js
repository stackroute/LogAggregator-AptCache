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

angular.module('aptLogApp').controller("dataRateController",function($scope,$http,ajaxService){
    $scope.requiredYear = 2015;
    $scope.requiredMonth = "";
    $scope.generate = function(year,month){
        $scope.requiredYear = year;
        $scope.requiredMonth = month;
        if(month===''){
          ajaxService.ajaxCall("dataRateData",year+"_all",$http);
        }
        else {
          ajaxService.ajaxCall("dataRateData",year+"_"+month+"_all",$http);
        }
     };
     $scope.setYear = function(year){
        $scope.requiredYear = year;
     }
     $scope.setMonth = function(month){
        $scope.requiredMonth = month;
     }
     $scope.initializeVars = function(isMonth){
       var urlData = "";
       if(isMonth===true){
         urlData = "true";
       }
       else{
         urlData = "false";
       }
       ajaxService.ajaxCall("getInfoGraph",urlData,$http,$scope);

     };
    $scope.filterGenerate = function(filterType,year,month){
        if($scope.requiredMonth===''){
          ajaxService.ajaxCall("dataRateData",$scope.requiredYear+"_"+filterType,$http);
        }
        else {
          ajaxService.ajaxCall("dataRateData",$scope.requiredYear+"_"+$scope.requiredMonth+"_"+filterType,$http);
        }

    };
    $scope.tab=1;
    $scope.setTab = function(tabVal){
        $scope.tab=tabVal;
      };

});
