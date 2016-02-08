aptLogApp = angular.module("aptLogApp",['ngRoute','ui.grid','dropDownElement']);

aptLogApp.controller('DropDownController',function($scope)
{
  $scope.yearList=['2013','2014','2015','2016'];
  // $scope.monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
  $scope.monthList=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  $scope.modeList=["Input","Output"];
});

aptLogApp.config(function($routeProvider) {
        $routeProvider
            // route for the home page
            .when('/', {
              templateUrl : 'views/aptCache/logRate/allLogs.html',
              controller: 'logRateController'
            })
            .when('/requestrate', {
                templateUrl : 'views/aptCache/logRate/allLogs.html',
                controller: 'logRateController'
            })
            .when('/packageanalytics', {
                templateUrl : 'views/aptCache/packageAnalytics/packageAnalytics.html',
                controller: 'packageAnalyticsController'
            })
            .when('/datarate', {
                templateUrl : 'views/aptCache/dataRate/allData.html',
                controller: 'dataRateController'
            })
            .when('/packagerepository', {
              templateUrl : 'views/aptCache/packageRepository/packageRepository.html',
                controller: 'repositoryController'
            })
            .when('/packagecount', {
                templateUrl : 'views/aptCache/packageCount/packageCount.html',
                controller: 'packageCountController'
            })
            .otherwise({
                redirectTo: 'html/components/main.html'
            });

    });
