angular.module('aptLogApp').controller("logRateController",function($scope,$http,ajaxService){
    $scope.year = 2015;
    $scope.month = "";
    $scope.generate = function(year,month){
        $scope.year = year;
        $scope.month = month;
        if(month===''){
          ajaxService.ajaxCall("logRateData",year+"_all",$http);
        }
        else {
          ajaxService.ajaxCall("logRateData",year+"_"+month+"_all",$http);
        }
     };
    $scope.filterGenerate = function(filterType,year,month){
        if($scope.month===''){
          ajaxService.ajaxCall("logRateData",$scope.year+"_"+filterType,$http);
        }
        else {
          ajaxService.ajaxCall("logRateData",$scope.year+"_"+$scope.month+"_"+filterType,$http);
        }

    };
    $scope.tab=1;
    $scope.setTab = function(tabVal){
        $scope.tab=tabVal;
        console.log($scope.tab);
    };
});
