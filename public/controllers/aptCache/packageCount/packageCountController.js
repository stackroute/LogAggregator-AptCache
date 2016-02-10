angular.module('aptLogApp').controller("packageCountController",function($scope, $http, ajaxService){
  $scope.requiredYear = 2015;
  $scope.requiredMonth = "";
  $scope.tab=1;
  $scope.tableData = {};
  $scope.packageHeader=["SI No", "Package Name", "Package Version", "Package Architecture", "Count"]
  $scope.info = {};
  $scope.msg="";
  $scope.setMonth = function(monthValue){
    $scope.requiredMonth = monthValue;
  }

  $scope.setYear = function(yearValue){
    $scope.requiredYear = yearValue;
  }

  $scope.initializeVars = function(isMonth){
    var urlData = "";
    if(isMonth===true){
      urlData = "true";
    }
    else{
      urlData = "false";
    }
    ajaxService.ajaxCall("getInfoTable",urlData,$http,$scope);

  };
  $scope.writeTable = function(year,month){
      $scope.requiredYear = year;
      $scope.requiredMonth = month;
      if($scope.requiredMonth===""){
        ajaxService.ajaxCall("packageCount",$scope.requiredYear,$http,$scope);
      }
      else{
        ajaxService.ajaxCall("packageCount",$scope.requiredYear+"_"+$scope.requiredMonth,$http,$scope);
      }
  };

  $scope.setTab = function(tabVal){
      $scope.tab=tabVal;
  };
});
