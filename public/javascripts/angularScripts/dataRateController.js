angular.module('aptLogApp').controller("dataRateController",function($scope,$http,ajaxService){
    $scope.year = 2015;
    $scope.month = "";
    $scope.generate = function(year,month){
        $scope.year = year;
        $scope.month = month;
        if(month===''){
          ajaxService.ajaxCall("dataRateData","all/"+year+"/monthwise",$http);
        }
        else {
          ajaxService.ajaxCall("dataRateData","all/"+year+"/"+month,$http);
          ajaxService.ajaxCall("dataRateData","all/"+year+"/"+month,$http);
        }
     };
    $scope.filterGenerate = function(filterType,year,month){
        if($scope.month===''){
          ajaxService.ajaxCall("dataRateData",filterType+"/"+$scope.year+"/monthwise",$http);
        }
        else {
          ajaxService.ajaxCall("dataRateData",filterType+"/"+$scope.year+"/"+$scope.month,$http);
        }

    };
    $scope.tab=1;
    $scope.setTab = function(tabVal){
        $scope.tab=tabVal;
      };

});