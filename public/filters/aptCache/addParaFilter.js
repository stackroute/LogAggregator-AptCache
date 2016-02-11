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

angular.module('aptLogApp').filter('addPara',function(){
  return function(type,year,month){
      if(type==="logRateData"){
          if(month===""){
              return "This graph shows the number of apt logs grouped by outgoing requests and those cached by the server in all of "+year;
          }
          else{
              return "This graph shows the number of apt logs grouped by outgoing requests and those cached by the server in all of "+month+" in the year "+year;
          }
      }
      else if(type==="dataRateData"){
          if(month===""){
              return "This graph shows the data size of apt logs grouped by outgoing requests and those cached by the server in all of "+year;
          }
          else{
              return "This graph shows the data size of apt logs grouped by outgoing requests and those cached by the server in all of "+month+" in the year "+year;
          }
      }
      else if(type==="packageCount"){
          if(month===""){
              return "This table shows the number of apt logs cached by the server organized by package details for all of "+year;
          }
          else{
              return "This table shows the number of apt logs cached by the server organized by package details for all of "+month+" in the year "+year;
          }
      }
      else if(type==="packageAnalytics"){
          if(month===""){
              return "This table shows the number of apt logs cached by the server organized by package and operating system for all of "+year;
          }
          else{
              return "This table shows the number of apt logs cached by the server organized by package and operating system for all of "+month+" in the year "+year;
          }
      }
  }
});

angular.module('aptLogApp').filter('showLinks',function(){
  return function(tab){
    return angular.lowercase(tab.split(' ').join(''));
  }
});
