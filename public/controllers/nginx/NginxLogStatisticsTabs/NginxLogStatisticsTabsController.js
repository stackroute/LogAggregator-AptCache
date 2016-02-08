angular.module('logAggregator').controller('NginxLogStatisticsController', ['$scope', '$cookies','$location','$state',
function($scope,$cookies,$location,$state) {
  if($cookies.get('login')==='true'){
    var result=document.getElementsByClassName('homepage');
    angular.element(result).css('display','block');
    var angularRoute = $location.$$path.split('/');
    if(!angularRoute[2])
    {
      $state.go('NginxLogStatistics.loglisting');
    }
  }
  else{
    $location.path('/');
  }
}]);//close fn
