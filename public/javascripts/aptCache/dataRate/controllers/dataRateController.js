angular.module('aptLogApp').controller("dataRateController",function($scope,$http,ajaxService){
    $scope.requiredYear = 2015;
    $scope.requiredMonth = "";
    $scope.generate = function(year,month){
        $scope.requiredYear = year;
        $scope.requiredMonth = month;
        if(month===''){
          ajaxService.ajaxCall("dataRateData","all/"+year+"/monthwise",$http);
        }
        else {
          ajaxService.ajaxCall("dataRateData","all/"+year+"/"+month,$http);
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
    $scope.filterGenerate = function(filterType,year,month){
        if($scope.requiredMonth===''){
          ajaxService.ajaxCall("dataRateData",filterType+"/"+$scope.requiredYear+"/monthwise",$http);
        }
        else {
          ajaxService.ajaxCall("dataRateData",filterType+"/"+$scope.requiredYear+"/"+$scope.requiredMonth,$http);
        }

    };
    $scope.tab=1;
    $scope.setTab = function(tabVal){
        $scope.tab=tabVal;
      };

});
