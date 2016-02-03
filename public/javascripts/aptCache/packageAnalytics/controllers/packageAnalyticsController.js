angular.module('aptLogApp').controller("packageAnalyticsController",function($scope,$http,ajaxService){
  $scope.requiredYear = 2015;
  $scope.requiredMonth = "";
  $scope.info = undefined;
  $scope.writeTable = function(year,month){
      $scope.requiredYear = year;
      $scope.requiredMonth = month;
      if(month===""){
          ajaxService.ajaxCall("packageAnalytics",year,$http,$scope);
      }
      else{
          ajaxService.ajaxCall("packageAnalytics",year+"_"+month,$http,$scope);
      }
  };
  $scope.setYear = function(year){
     $scope.requiredYear = year;
  }
  $scope.setMonth = function(month){
     $scope.requiredMonth = month;
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
  $scope.tab=1;
  $scope.setTab = function(tabVal){
      $scope.tab=tabVal;
    };

});
