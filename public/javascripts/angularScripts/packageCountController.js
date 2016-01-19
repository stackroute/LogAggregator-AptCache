angular.module('aptLogApp').controller("packageCountController",function($scope,$http,ajaxService){
  $scope.year = 2015;
  $scope.month = "";
  $scope.tableData = {};
  $scope.writeTable = function(){
      if($scope.month===""){
          ajaxService.ajaxCall("packageCount",$scope.year,$http,$scope);
      }
      else{
          ajaxService.ajaxCall("packageCount",$scope.year+"_"+$scope.month,$http,$scope);
      }
  };
  $scope.tab=1;
  $scope.setTab = function(tabVal){
      $scope.tab=tabVal;
  };

});
