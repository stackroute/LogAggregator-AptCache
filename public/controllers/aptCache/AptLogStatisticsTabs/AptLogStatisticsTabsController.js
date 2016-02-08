angular.module('logAggregator').controller('AptLogStatisticsController', ['$scope', '$cookies','$location','$state',
function($scope,$cookies,$location,$state) {
  if($cookies.get('login')==='true'){
    var result=document.getElementsByClassName('homepage');
    angular.element(result).css('display','block');
    var angularRoute = $location.$$path.split('/');
    if(!angularRoute[2])
    {
      $state.go('AptLogStatistics.requestrate');
    }
  }
  else{
    $location.path('/');
  }
}]);//close fn
