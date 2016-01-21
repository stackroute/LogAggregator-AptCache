aptLogApp = angular.module("aptLogApp",['ngRoute','ui.grid','dropdownModule']);

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
                templateUrl : 'html/main.html',
            })
            .when('/home',{
                templateUrl: 'html/main.html'
            })
            .when('/requestrate', {
                templateUrl : 'html/allLogs.html',
                controller: 'logRateController'
            })

            .when('/packageanalytics', {
                templateUrl : 'html/packageAnalytics.html',
                controller: 'packageAnalyticsController'
            })
            .when('/requestdata', {
                templateUrl : 'html/allData.html',
                controller: 'dataRateController'
            })
            .when('/packagerepository', {
                templateUrl : 'html/packageRepository.html',
                controller: 'repositoryController'
            })


            .when('/packagecount', {
                templateUrl : 'html/packageCount.html',
                controller: 'packageCountController'
            })
            .otherwise({
                redirectTo: 'html/main.html'
            });

    });
