angular.module('aptLogApp').controller("packageCountController",function($scope, $http, ajaxService){
  $scope.year = "";
  $scope.month = "";
  $scope.tab=1;
  $scope.tableData = {};
  $scope.monthList=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  $scope.yearList=['2013','2014','2015','2016'];
  $scope.packageHeader=["SI No", "Package Name", "Package Version", "Package Architecture", "Count"]

  $scope.setMonth = function(monthValue){
    $scope.month = monthValue;
  }

  $scope.setYear = function(yearValue){
    $scope.year = yearValue;
  }

  $scope.defaultYearMonth = function(isMonth){
    var latestDate = new Date();
    var latestMonth = latestDate.getMonth();
    var latestYear = latestDate.getFullYear();
    $scope.year= latestYear;
    if(isMonth)
    {
      $scope.month= $scope.monthList[latestMonth];
    }

  }

  $scope.writeTable = function(){
      if($scope.month===""){
        ajaxService.ajaxCall("packageCount",$scope.year,$http,$scope);
      }
      else{
        ajaxService.ajaxCall("packageCount",$scope.year+"_"+$scope.month,$http,$scope);
      }
  };

  $scope.setTab = function(tabVal){
      $scope.tab=tabVal;
  };
});
