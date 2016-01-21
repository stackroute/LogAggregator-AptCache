var dropDownElement=angular.module("dropDownElement",[]);
dropDownElement.controller('dropController',function($scope)
{
  $scope.actionFunction = function(){}
});
dropDownElement.directive('dropMonth',function(){
  return {
    restrict:'E',
    templateUrl:'html/dropMonth.html'
  }
});

dropDownElement.directive('dropYear', function(){
  return {
    restrict: 'E',
    templateUrl:'html/dropYear.html'
  };
});

dropDownElement.directive('radioFilter',function(){
  return {
    restrict:'E',
    templateUrl:'html/radioFilter.html'
  }
});
