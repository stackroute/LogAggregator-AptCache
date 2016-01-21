var dropdownModule=angular.module("dropdownModule",[]);

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
