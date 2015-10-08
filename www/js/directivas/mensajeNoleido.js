angular.module('starter')
 .directive('mensajeNoleido', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }, 
    templateUrl: 'js/directivas/mensajeNoleido.html' 
  }; 
});