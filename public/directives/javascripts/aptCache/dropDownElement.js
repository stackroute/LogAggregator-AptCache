var dropDownElement=angular.module("dropDownElement",[]);
dropDownElement.controller('dropController',function($scope)
{
  $scope.display = true;
  $scope.actionFunction = function(){}
});
dropDownElement.directive('dropMonth',function(){
  return {
    restrict:'E',
    templateUrl:'directives/html/aptCache/dropMonth.html'
  }
});

dropDownElement.directive('dropYear', function(){
  return {
    restrict: 'E',
    templateUrl:'directives/html/aptCache/dropYear.html'
  };
});


dropDownElement.directive('radioFilter',function(){
  return {
    restrict:'E',
    templateUrl:'directives/html/aptCache/radioFilter.html'
  };
});
dropDownElement.directive('dropdownMode', function(){
  return {
    restrict: 'E',
    templateUrl:'directives/html/aptCache/dropMode.html'
  };
});
