var dropdownModule=angular.module("dropdownModule",[]);

dropdownModule.controller('dropdownController',function($scope)
{
  $scope.yearList=['2013','2014','2015','2016'];
  $scope.monthList=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
});

dropdownModule.directive('dropdownMonth',function(){
  return {
    restrict:'E',
    templateUrl:'html/dropdownMonth.html'
  }
});

dropdownModule.directive('dropdownYear', function(){
  return {
    restrict: 'E',
    templateUrl:'html/dropdownYear.html'
  };
});
