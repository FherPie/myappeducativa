angular.module('starter')
 .directive('userInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'js/directivas/userInfo.html' 
  }; 
});