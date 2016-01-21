var dropDownElement=angular.module("dropDownElement",[]);
dropDownElement.controller('dropController',function($scope)
{
  $scope.display = true;
  $scope.actionFunction = function(){}
});
dropDownElement.directive('dropMonth',function(){
  return {
    restrict:'E',
    templateUrl:'html/directives/dropMonth.html'
  }
});

dropDownElement.directive('dropYear', function(){
  return {
    restrict: 'E',
    templateUrl:'html/directives/dropYear.html'
  };
});

dropDownElement.directive('dropYearMonth', function(){
  return {
    restrict: 'E',
    templateUrl:'html/directives/dropYearMonth.html'
  };
});

dropDownElement.directive('radioFilter',function(){
  return {
    restrict:'E',
    templateUrl:'html/filters/radioFilter.html'
  }
});
