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
