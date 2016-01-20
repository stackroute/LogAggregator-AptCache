var dropdownModule=angular.module("DropDownModule",[]);

dropdownModule.controller('DropDownController',function($scope)
{
  $scope.yearList=['2013','2014','2015','2016'];
  // $scope.monthList=["January","February","March","April","May","June","July","August","September","October","November","December"];
  $scope.monthList=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
});

dropdownModule.directive('dropdownMonth',function(){
  return {
    restrict:'E',
    templateUrl:'dropdownMonth.html'
  }
});

dropdownModule.directive('dropdownYear', function(){
  return {
    restrict: 'E',
    templateUrl:'dropdownYear.html'
  };
});
