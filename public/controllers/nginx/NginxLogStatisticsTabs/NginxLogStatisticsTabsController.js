angular.module('logAggregator').controller('NginxLogStatisticsController', ['$scope', '$cookies','$location','$state',
function($scope,$cookies,$location,$state) {
  if($cookies.get('login')==='true'){
    var result=document.getElementsByClassName('homepage');
    angular.element(result).css('display','block');
    var angularRoute = $location.$$path.split('/');
    if(!angularRoute[2])
    {
      $state.go('NginxLogStatistics.loglisting');
      angularRoute[2] = "loglisting";
    }
    $scope.activeTab = angularRoute[2];
  }
  else{
    $location.path('/');
  }

  $scope.setActiveClass = function(tab) {
    $scope.activeTab = angular.lowercase(tab.split(" ").join(''));
  }

}]);//close fn
