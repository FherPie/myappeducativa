angular.module('starter')
.directive('appInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'templates/appInfo.html' 
  }; 
});