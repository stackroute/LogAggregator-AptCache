angular.module('aptLogApp').controller("logRateController",function($scope,$http,ajaxService){
    $scope.requiredYear = 2015;
    $scope.requiredMonth = "";
    $scope.info = undefined;
    $scope.generate = function(year,month){
        $scope.requiredYear = year;
        $scope.requiredMonth = month;
        if(month===''){
          ajaxService.ajaxCall("logRateData",year+"_all",$http);
        }
        else {
          ajaxService.ajaxCall("logRateData",year+"_"+month+"_all",$http);
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
       ajaxService.ajaxCall("getInfoGraph",urlData,$http,$scope);

     };
    $scope.filterGenerate = function(filterType){
        if($scope.requiredMonth===''){
          ajaxService.ajaxCall("logRateData",$scope.requiredYear+"_"+filterType,$http);
        }
        else {
          ajaxService.ajaxCall("logRateData",$scope.requiredYear+"_"+$scope.requiredMonth+"_"+filterType,$http);
        }

    };
    $scope.tab=1;
    $scope.setTab = function(tabVal){
        $scope.tab=tabVal;
      };
});
