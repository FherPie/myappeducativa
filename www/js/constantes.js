angular.module('starter')
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  profesor: 'dct',
  estudiante: 'est',
  representante: 'rpt'
})

.constant('HOST_NAME', {
  URL: 'http://192.168.0.25:8080',
  PRODUCCION: 'http://192.168.0.25:8080',
  PUERTO: '8080'
})

;