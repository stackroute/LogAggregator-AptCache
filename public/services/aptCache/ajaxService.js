/*Copyright 2016 Wipro Limited, NIIT Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

This code is written by Ashish Gupta, Tarun Mohandas, Suriya Prakash, Srinivasa Burli, Jishnu Surendran and Bhairavi Balakrishnan*/

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
              $scope.msg="";
              if(data.length===0)
              $scope.msg="No Data Available for this Period.";
              $scope.tableData = data;
            });
        }
        else if(type==="packageAnalytics"){
            var url = '/packageanalytics/package/package_bz2_info/'+urlData;
            $http.get(url).success( function(data) {
              $scope.msg="";
              if(data.length===0)
              $scope.msg="No Data Available for this Period.";
            $scope.tableData = data;
            });
        }
        else if(type==="getInfoGraph"){
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
        else if(type==="getInfoTable"){
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
              $scope.writeTable($scope.requiredYear,$scope.requiredMonth);
          });
        }
        else if(type==="getRepoTable"){
          var url = '/getInfo/initInfo';
          $http.get(url).success(function(data){

              $scope.info = data;
              $scope.requiredYear = $scope.info["currentYear"];
              $scope.mode=urlData;
              $scope.writeTable($scope.requiredYear,$scope.mode);
          });
        }
        else if(type==="repository"){
            var url = '/repository/mode'+urlData;
            $http.get(url).success( function(data) {
              for(i = 0; i < data.length; i++){                             //logic for calculating rowspan
                var repositoryName1 = data[i].repository;                   //i,j & k,m is for traversing through the rows of data
                data[i].rowspan = 1;
                for(j = i+1; j < data.length; j++){
                  var repositoryName2 = data[j].repository;
                  if(repositoryName1 == repositoryName2 ){
                    data[i].rowspan += 1;
                    for(k=0;k<data.length;k++){
                      var poolName1=data[k].pool;
                      data[k].rowspan1=1;
                      for(m=k+1;m<data.length;m++){
                        var poolName2=data[m].pool;
                        if(poolName1==poolName2){
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
              $scope.msg="";
              if(data.length===0)
              $scope.msg="No Data Available for this Period.";
              $scope.tableData = data;

            });
        }
    }
    return factory;
});
