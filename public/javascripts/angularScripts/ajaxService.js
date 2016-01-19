angular.module('aptLogApp').factory('ajaxService',function(){
    var factory = {};
    factory.ajaxCall = function(type,urlData,$http,$scope){
        if(type==="logRateData"){
            var url = '/logRateData/rate/'+urlData;
            $http.get(url).success( function(data) {
            createGraph(data);
          });
        }
        else if(type==="dataRateData"){
            var url = '/dataRateData/size/'+urlData;
            $http.get(url).success( function(data) {
              createDataGraph(data);
            });
        }
        else if(type==="packageCount"){
            var url = '/packageCount/year/year_month/'+urlData;
            $http.get(url).success( function(data) {
              $scope.tableData = data;
            });
        }
        else if(type==="packageAnalytics"){
            var url = '/packageanalytics/package/package_bz2_info/'+urlData;
            $http.get(url).success( function(data) {
              $scope.tableData = data;
            });
        }
        else if(type==="getInfo"){
          var url = '/getInfo/initInfo';
          $http.get(url).success(function(data){
              $scope.info = data;
              $scope.requiredYear = $scope.info["currentYear"];
              if(urlData === "true"){
                  $scope.requiredMonth = $scope.info["currentMonth"];
              }
              else{
                  $scope.requiredMonth = '';
              }
              $scope.generate($scope.requiredYear,$scope.requiredMonth);
          });
        }
        else if(type==="repository"){
            var url = '/repository/mode'+urlData;
            $http.get(url).success( function(data) {
              for(i = 0; i < data.length; i++){
                var l1 = data[i].repository;
                data[i].rowspan = 1;
                for(j = i+1; j < data.length; j++){
                  var l2 = data[j].repository;
                  if(l1 == l2){
                    data[i].rowspan += 1;
                    for(k=0;k<data.length;k++){
                      var n1=data[k].pool;
                      data[k].rowspan1=1;
                      for(m=k+1;m<data.length;m++){
                        var n2=data[m].pool;
                        if(n1==n2){
                          data[k].rowspan1+=1;
                        }
                        else{
                          break;
                        }
                      }
                      k=m-1;
                    }
                  }
                  else{
                    break;
                  }
                }
              i = j-1;
              }
            $scope.tableData=data;

            });
        }
    }
    return factory;
});
