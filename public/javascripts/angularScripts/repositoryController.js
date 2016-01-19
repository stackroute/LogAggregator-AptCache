angular.module('aptLogApp').controller("repositoryController",function($scope,$http,ajaxService){
    $scope.year = 2015;
    $scope.mode = "";
    $scope.tableData = {};


    $scope.generate = function(year,mode){
        $scope.year = year;
        $scope.mode = mode;
          ajaxService.ajaxCall("repository","/"+year+"/"+mode,$http,$scope);
        };
});
