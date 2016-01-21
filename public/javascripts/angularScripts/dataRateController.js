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
        }
     };
     $scope.setYear = function(year){
        $scope.year = year;
     }
     $scope.setMonth = function(month){
        $scope.month = month;
     }
     $scope.initializeVars = function(isMonth){
       var urlData = "";
       if(isMonth===true){
         urlData = "true";
       }
       else{
         urlData = "false";
       }
       ajaxService.ajaxCall("getInfoGraph",urlData,$http,$scope);

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
