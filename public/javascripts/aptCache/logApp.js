aptLogApp = angular.module("aptLogApp",['ngRoute','ui.grid','dropDownElement']);

aptLogApp.controller('DropDownController',function($scope)
{
  $scope.yearList=['2013','2014','2015','2016'];
  // $scope.monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
  $scope.monthList=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  $scope.modeList=["Input","Output"];
});

aptLogApp.controller("ActiveController", function($scope){
  $scope.menuItems = [
    {
      itemName : "Home",
      htmlPageName:"#home"
    },
    {
      itemName : "Request Rate",
      htmlPageName:"#requestrate"
    },
    {
      itemName : "Data Rate",
      htmlPageName:"#requestdata"
    },
    {
      itemName : "Package Count",
      htmlPageName:"#packagecount"
    },
    {
      itemName : "Package Analytics",
      htmlPageName:"#packageanalytics"
    },
    {
      itemName : "Package Repository",
      htmlPageName:"#packagerepository"
    }
  ];
  $scope.activeMenu = "Home";

  $scope.setActive = function(menuItem) {
  $scope.activeMenu = menuItem
  }
});

aptLogApp.config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'html/components/main.html'
            })
            .when('/home',{
                templateUrl: 'html/components/main.html'
            })
            .when('/requestrate', {
                templateUrl : 'javascripts/aptCache/logRate/views/allLogs.html',
                controller: 'logRateController'
            })
            .when('/packageanalytics', {
                templateUrl : 'javascripts/aptCache/packageAnalytics/views/packageAnalytics.html',
                controller: 'packageAnalyticsController'
            })
            .when('/requestdata', {
                templateUrl : 'javascripts/aptCache/dataRate/views/allData.html',
                controller: 'dataRateController'
            })
            .when('/packagerepository', {
              templateUrl : 'javascripts/aptcache/packageRepository/views/packageRepository.html',
                controller: 'repositoryController'
            })
            .when('/packagecount', {
                templateUrl : 'javascripts/aptCache/packageCount/views/packageCount.html',
                controller: 'packageCountController'
            })
            .otherwise({
                redirectTo: 'html/components/main.html'
            });

    });
