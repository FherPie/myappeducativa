angular.module('starter')
.factory('MensajesNoLeidos', function ($resource, HOST_NAME) {
//    var user=AuthService.usercards();
//    alert(user[0].id);
//    alert(HOST_NAME.URL+'/RestPlanurricular/resources/consultarMensajes/:user',{user: '@user'});
    return $resource(HOST_NAME.URL+'/RestPlanurricular/resources/consultarMensajes/:user',{user: '@user'});
});