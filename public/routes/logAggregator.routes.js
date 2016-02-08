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

angular.module('logAggregator').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'views/auth/auth.view.html',
      controller : 'authController'
    })
    .when('/login', {
      redirectTo : 'views/auth/auth.view.html',
      controller : 'authController'
    })
    .when('/changePassword', {
      templateUrl : 'views/auth/changePassword.view.html',
      controller : 'changePasswordController'
    })
    .when('/aboutus', {
      templateUrl : 'views/auth/aboutus.view.html',
      controller: 'aboutusController'
    })
    .when('/errorhandler', {
      templateUrl : 'views/auth/error.view.html',
      controller : 'errorHandlerController'
    })
    .when('/useragent', {
      templateUrl : 'views/nginx/userAgent/userAgent.view.html',
      controller : 'userAgentController'
    })
    .when('/loglisting', {
      templateUrl : 'views/nginx/logListing/logListing.view.html',
      controller : 'logController'
    })
    .when('/trafficrate', {
      templateUrl : 'views/nginx/trafficRate/trafficRate.view.html',
      controller : 'trafficRateController'
    })
    .when('/requestrate', {
        templateUrl : 'views/aptCache/logRate/allLogs.html',
        controller: 'logRateController'
    })
    .when('/packageanalytics', {
        templateUrl : 'views/aptCache/packageAnalytics/packageAnalytics.html',
        controller: 'packageAnalyticsController'
    })
    .when('/requestdata', {
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
      redirectTo : '/',
      controller : 'errorHandlerController'
    });
  }
]);
