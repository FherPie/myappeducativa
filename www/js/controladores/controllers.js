angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPlatform, $location, $state, $ionicPopup, AuthService, AUTH_EVENTS) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
 
  // });

// $scope.mensaje='Este es un  mensaje de prueba deberia aparecer si no  entonces no.'




//   $ionicPlatform.ready(function(){

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });



  // Open the login modal
  $scope.login = function() {

    $scope.modal.show();

  };

  $scope.logout = function() {
      
      
     
    AuthService.logout();

    $state.go('gruposusuarios');
  };


//   });


 //  // Perform the login action when the user submits the login form
 //  $scope.doLogin = function() {
     
 //    // alert($scope.loginData.username);
 //    console.log('Doing login', $scope.loginData);

 //    // Simulate a login delay. Remove this and replace with your login
 //    // code if using a login system
 //    $timeout(function() {

 //    $location.path('principal/tablero');
 // // $state.go('app.principal', {}, {reload: false});

 //     // $window.location='/app/principal';
 //    $scope.closeLogin();

     



 //    }, 1000);

 //  };


$scope.usuarios=AuthService.usercards();
$scope.username = AuthService.username();
$scope.menus=AuthService.menus();

 $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'No Autorizado!',
      template: 'No puede Acceder a este Recurso.'
    });
  });


 $scope.setCurrentUsercard = function(usercard) {
    $scope.usuarios = usercard;
  };

//
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
//
//
 $scope.setCurrentMenus= function(menus) {
    $scope.menus = menus;
  };


$scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('gruposusuarios');
    var alertPopup = $ionicPopup.alert({
      title: 'Sesión Cerrada!',
      template: 'Logearse Nuevamente.'
    });
  });

})

.controller('PlaylistsCtrl', function($scope) {


})

.controller('mensajesnoleidosCtrl', function($scope,$timeout, $ionicModal, $ionicPlatform,  MensajesNoLeidos, AuthService) {

//
//$scope.$apply(function(){ 
// $scope.init = function(){
var usermensajes=AuthService.usercards();   
$scope.mensajes= MensajesNoLeidos.query({user:usermensajes[0].id}); 
$scope.titulovista="Mensajes";
//};
//
//$timeout($scope.init);
//
//console.log('Se ejecuta el Controlador de Mensajes.');
//});

     



  
})

.controller('principal', function( $scope, USER_ROLES, $state) {

$scope.irinicio= function urlinicio(event){
//    event.preventDefault();
       $state.go('principal.tablero', {}, {reload: true});
};



//    $scope.app = { 
//      nombre: 'EvConsultores',
//      id: 1, 
//      slogan: 'Hecho en Ecuador',
//      icon: 'http://evconsultores.net/wp-content/uploads/2015/03/EV-logo.png',
//      web: 'www.evconsultores.net'
//    };
 
//   $scope.menus=AuthService.menus();

     // $scope.rol=USER_ROLES.profesor;
})


.controller('profesor', function($scope, USER_ROLES) {
    $scope.app = { 
      nombre: 'EvConsultores',
      id: 1, 
      slogan: 'Hecho en Ecuador',
      icon: 'http://evconsultores.net/wp-content/uploads/2015/03/EV-logo.png',
      web: 'www.evconsultores.net'
    };
    $scope.titulovista="PROFESOR";
 
     // $scope.rol=USER_ROLES.profesor;
})

.controller('alumno', function($scope, USER_ROLES, $cordovaDatePicker) {
    $scope.app = { 
      nombre: 'EvConsultores',
      id: 1, 
      slogan: 'Hecho en Ecuador',
      icon: 'http://evconsultores.net/wp-content/uploads/2015/03/EV-logo.png',
      web: 'www.evconsultores.net'
    };
    $scope.titulovista="ALUMNO";
 
var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    minDate: new Date() - 10000,
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  };


 document.addEventListener("deviceready", function () {

    $cordovaDatePicker.show(options).then(function(date){
        alert(date);
    });

  }, false);





     // $scope.rol=USER_ROLES.profesor;
})
.controller('tablero', function($scope, $state, $http, $ionicPopup,  AuthService) {

//alert('dsd');
//$scope.usuarios= AuthService.usercards();
//alert($scope.usuarios[0].nombres);
 $scope.titulovista="Inicio";


//   $scope.performValidRequest = function() {
//     $http.get('http://localhost:8100/valid').then(
//       function(result) {
//         $scope.response = result;
//       });
//   };


//   $scope.performUnauthorizedRequest = function() {
//     $http.get('http://localhost:8100/notauthorized').then(
//       function(result) {
//         // No result here..
//       }, function(err) {
//         $scope.response = err;
//       });
//   };






// $scope.performInvalidRequest = function() {
//     $http.get('http://localhost:8100/notauthenticated').then(
//       function(result) {
//         // No result here..
//       }, function(err) {
//         $scope.response = err;
//       });
// };



// $scope.response='Aqui va las Respuesta';
// alert('Hola');
})


.controller('appinfo', function($scope, USER_ROLES) {
    $scope.app = { 
      nombre: 'EvConsultores',
      id: 1, 
      slogan: 'Hecho en Ecuador',
      icon: 'http://evconsultores.net/wp-content/uploads/2015/03/EV-logo.png',
      web: 'www.evconsultores.net'
    };
    $scope.titulovista="App  Info";

     // $scope.rol=USER_ROLES.profesor;
})


.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService, USER_ROLES, $stateParams) {

console.log($stateParams.rol);
$scope.rol= $stateParams.rol;

$scope.titulovista="Gestión Educativa App";

$scope.roles=USER_ROLES;


  // Form data for the login modal
  $scope.data = {};
  $scope.doLogin = function(data) {
    AuthService.login(data.username, data.password, $scope.rol).then(function(authenticated) {
     $scope.closeLogin();
     $scope.setCurrentUsername(data.username);
     $scope.setCurrentUsercard(AuthService.usercards());
     $scope.setCurrentMenus(AuthService.menus());
     $state.go('principal.tablero', {}, {reload: true});
    // alert(data.rol);
//$scope.setCurrentUsercard(AuthService.);
     
    
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };



 //  // Perform the login action when the user submits the login form
 //  $scope.doLogin = function() {
     
 //    // alert($scope.loginData.username);
 //    console.log('Doing login', $scope.loginData);

 //    // Simulate a login delay. Remove this and replace with your login
 //    // code if using a login system
 //    $timeout(function() {

 //    $location.path('principal/tablero');
 // // $state.go('app.principal', {}, {reload: false});

 //     // $window.location='/app/principal';
 //    $scope.closeLogin();

 //    }, 1000);

 //  };

})

.controller('gruposusuarios', function($scope, USER_ROLES) {
$scope.roles=USER_ROLES;

})


.controller('mensaje', function($scope, $stateParams) {

});
