angular.module('aptLogApp').controller("packageAnalyticsController",function($scope,$http,ajaxService){
  $scope.year = 2015;
  $scope.month = "";
  $scope.tableData = {};
  $scope.writeTable = function(){
      if($scope.month===""){
          ajaxService.ajaxCall("packageAnalytics",$scope.year,$http,$scope);
      }
      else{
          ajaxService.ajaxCall("packageAnalytics",$scope.year+"_"+$scope.month,$http,$scope);
      }
  };
  $scope.tab=1;
  $scope.setTab = function(tabVal){
      $scope.tab=tabVal;
      console.log($scope.tab);
  };

});
