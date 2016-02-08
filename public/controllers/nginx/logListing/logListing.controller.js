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

angular.module('logAggregator').controller('logController', ['$scope', '$cookies','$location','$rootScope','logService','$interval',
function($scope,$cookies,$location, $rootScope, logService, $interval) {
  if($cookies.get('login')==='true'){
    var result=document.getElementsByClassName('homepage');
    angular.element(result).css('display','block');
  // if $scope.$parent
  $scope.$parent.clicked="";

  $scope.$parent.tab= 'logListing';
  $rootScope.tab = 'none'
  $scope.showLogProgress = true;
  logService.getPath_count().then(function(response) {
    $scope.Path_Count = response.data.arr;
  });
  var onComplete =  $interval(function(){
      if($scope.$parent.tab == 'logListing') {
        logService.getPath_count().then(function(response) {
          if(!angular.equals($scope.Path_Count, response.data.arr)) {
            data =  response.data;
            $scope.Path_Count = data.arr;//path_count data
            if($scope.currentpage == '1' && $scope.currentpath == 'All') {
              $scope.pathClickEvent($scope.currentpath, $scope.currentpage);
            } else if($scope.currentpage == '1'){
              $scope.pathClickEvent({path : $scope.currentpath}, $scope.currentpage);
            }
          }
          $scope.showLogProgress = false;
        });  //close then
      }
      else {
       $interval.cancel(onComplete);
      }
  },$scope.config.refreshInterval);

  logService.getPath_count().then(function(response) {
    data =  response.data;
    $scope.Path_Count = data.arr;//path_count data
    $scope.showLogProgress = false;
  });//close then

  $scope.pathClickEvent = function(obj, currentpage) {
    $scope.showLogDataProgress = true;
    currentpath = (obj == "All") ? "All": obj.path;
    $scope.currentpath =  currentpath;
    logService.getPathData(currentpath, currentpage).then(function(response) {
        count = response.data.count;
        $scope.view = (obj == "All") ? "All":"path";
        $scope.clickedPath = response.data.collection_data;
        $scope.no_of_pgs = (parseInt(count/100) + 1) ;
        $scope.getPgs = function(num){
          return new Array(num);
        };
        $scope.$watch('showLogProgress', function() {
          if(!$scope.showLogProgress)
            $scope.showLogDataProgress = $scope.showLogProgress;
        });
      });
      if(!currentpage)
        $scope.currentpage = 1;
  };//close pathclick event

  $scope.pathClickEvent("All");

  $scope.pagenoClickEvent = function(pgno) {
    $scope.showLogDataProgress = true;
    $scope.currentpage = pgno;
    logService.getPathData(currentpath,pgno).then(function(response) {
      $scope.clickedPath = response.data.collection_data;
      $scope.showLogDataProgress = false;
    });
  }
}//close pagenoClickEventlick event
else{
  $location.path('/');
}
}]);//close fn
