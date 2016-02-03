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

angular.module('logAggregator').controller('mainController', ['$scope','$cookies','$rootScope', '$window','$http','$location', 'loadConfig',
  function($scope,$cookies,$rootScope, $window,$http,$location, loadConfig ) {
      //  angular.element('.homepage').css('display','block');
      loadConfig.getdata( function(data) {
        $scope.config = data;
        $window.config = $scope.config;
      });

      $scope.aptLogTabs=['Request Rate','Data Rate','Package Count','Package Analytics','Package Repository'];
      $scope.nginxLogTabs=['Log Listing','User Agent','Traffic Rate'];
      var aptLogLinks={
        '/requestrate':"aptLogStatistics",
        '/datarate':"aptLogStatistics",
        '/packagecount':"aptLogStatistics",
        '/packageanalytics':"aptLogStatistics",
        '/packagerepository':"aptLogStatistics"
      };
      var angularRoute=$location.$$path;
      $scope.selection=aptLogLinks[angularRoute];

      $scope.dashName = "Dashboard";
    // $scope.selection="nginxLogStatistics";
    // $scope.changePasswordController=function(){
    //
    //   $location.path('/changePassword');
    // }
    $scope.setDashName = function(val){
      $scope.dashName = val;
    }
    $scope.setSelection=function(selection_name){
        $scope.selection = selection_name;
    }
    $scope.aboutus=function(){
      var watchlist=document.getElementsByClassName('watchlist-tabs');
      angular.element(watchlist).css('display','none');
      $location.path('/aboutus');
    }

    if($cookies.get('login')==='true'){
      var result=document.getElementsByClassName('homepage');
      angular.element(result).css('display','block');
      $location.path($location.path());
    }
    else{
    $cookies.put("login",'false');
  }
    $scope.showContent=false;
    $scope.logout=function(){
      $rootScope.loginMessage="";
      $rootScope.checkData="";
   $http.get('/auth/signout').then(function(response){
      var result=document.getElementsByClassName('homepage');
      angular.element(result).css('display','none');
      console.log("inside response function");
      $rootScope.tab="";
      $cookies.remove('login');
      $location.path('/');
    });
    }
  }
]);
