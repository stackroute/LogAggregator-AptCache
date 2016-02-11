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

angular.module('logAggregator').controller('AptLogStatisticsController', ['$scope', '$cookies','$location','$state',
function($scope,$cookies,$location,$state) {
  if($cookies.get('login')==='true'){
    var result=document.getElementsByClassName('homepage');
    angular.element(result).css('display','block');
    var angularRoute = $location.$$path.split('/');
    if(!angularRoute[2])
    {
      $state.go('AptLogStatistics.requestrate');
      angularRoute[2] = "requestrate";
    }
    $scope.activeTab = angularRoute[2];
  }
  else{
    $location.path('/');
  }

  $scope.setActiveClass = function(tab) {
    $scope.activeTab = angular.lowercase(tab.split(" ").join(''));
  }

}]);//close fn
