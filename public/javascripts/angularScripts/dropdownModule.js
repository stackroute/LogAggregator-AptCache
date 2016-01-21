var dropdownModule=angular.module("DropDownModule",[]);

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

dropdownModule.directive('dropdownMode', function(){
  return {
    restrict: 'E',
    templateUrl:'dropdownMode.html'
  };
});
