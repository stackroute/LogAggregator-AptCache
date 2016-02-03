var dropDownElement=angular.module("dropDownElement",[]);
dropDownElement.controller('dropController',function($scope)
{
  $scope.display = true;
  $scope.actionFunction = function(){}
});
dropDownElement.directive('dropMonth',function(){
  return {
    restrict:'E',
    templateUrl:'javascripts/aptCache/directives/views/dropMonth.html'
  }
});

dropDownElement.directive('dropYear', function(){
  return {
    restrict: 'E',
    templateUrl:'javascripts/aptCache/directives/views/dropYear.html'
  };
});

dropDownElement.directive('dropYearMonth', function(){
  return {
    restrict: 'E',
    templateUrl:'javascripts/aptCache/directives/views/dropYearMonth.html'
  };
});

dropDownElement.directive('radioFilter',function(){
  return {
    restrict:'E',
    templateUrl:'javascripts/aptCache/directives/views/radioFilter.html'
  };
});
dropDownElement.directive('dropdownMode', function(){
  return {
    restrict: 'E',
    templateUrl:'javascripts/aptCache/directives/views/dropMode.html'
  };
});
