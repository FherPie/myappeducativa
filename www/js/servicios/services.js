angular.module('starter')
        .service('AuthService', function ($q, $http, USER_ROLES, HOST_NAME) {
            var LOCAL_TOKEN_KEY = 'yourTokenKey';
            var USER_KEY = 'USER';
            var username = '';
            var institucion = '';
            var isAuthenticated = false;
            var role = '';
            var prueba = '';
            var authToken;
            var usercards = new Array();
            var menus = new Array();

            function loadUserCredentials() {
                var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
//    var user= window.localStorage.getItem(USER_KEY);
//    sessionStorage.user=angular.toJson(user);  
                console.log('Ejecuta Load');
                if (token) {
//        alert(user.rol);
                    useCredentials(token);
                }
            }

            function storeUserCredentials(token) {
                window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
                useCredentials(token);
            }

            function ObtUser() {
                usercards = JSON.parse(sessionStorage.getItem('user'));
//  usercards=angular.fromJson(sessionStorage.user); 
//      alert(usercards[0].nombres);
            }


            function setUser(user) {
//    alert(user[0].institucion);
                sessionStorage.setItem('user', JSON.stringify(user));

                usercards = angular.fromJson(sessionStorage.user);
//    institucion= usercards[0].nombres;
//    alert(institucion);

            }

            function ObtMenus() {
//    alert(usercards[0].id);
//if(usercards[0].id!==null){}
//                try {
//                    usercards=angular.fromJson(sessionStorage.user);  
//                     console.log('Ejecuta Menus noNulo.'+usercards[0].id);
                menus = [{"menu": "Asignaturas", "hrefe": "/profesorasignatura", "rol": USER_ROLES.profesor, "cssclass": "ion-log-out", "navview": "asignatura-tab"},
                    {"menu": "Notas", "hrefe": "/educacion", "rol": USER_ROLES.profesor, "cssclass": "ion-nuclear", "navview": "admin-tab"},
                    {"menu": "Mensajes no leídos", "hrefe": "/mensajesnoleidosVista", "rol": USER_ROLES.profesor, "cssclass": "ion-email-unread", "navview": "admin-tab"},
                    {"menu": "Actividades Alumno", "hrefe": "/alumno", "rol": USER_ROLES.estudiante, "cssclass": "ion-nuclear", "navview": "public-tab"},
                    {"menu": "Clubs Estudiante", "hrefe": "/appInfo", "rol": USER_ROLES.estudiante, "cssclass": "ion-nuclear", "navview": "public-tab"}];

                for (var i = menus.length - 1; i >= 0; i--) {
                    if (role !== menus[i].rol) {
                        menus.splice(i, 1);
                    }
                }
                ;
//                } catch (e) {
//                 console.log(e);   
//                }
            }

            function useCredentials(token) {
//   alert(user.rol);
                username = token.split('.')[0];
                role = token.split('.')[1];
//    alert(role);
                isAuthenticated = true;
                authToken = token;
                // if (role == '#'+DOCENTE) {
                //   role = USER_ROLES.profesor
                // }
                // if (username == 'user') {
                //   role = USER_ROLES.estudiante
                // }
                // Set the token as header for your requests!
                $http.defaults.headers.common['X-Auth-Token'] = token;
                ObtUser();
                ObtMenus();

            }

            function destroyUserCredentials() {
//    alert("desturie");
                authToken = undefined;
                username = '';
                menus = new Array();
                usercards = new Array();
                isAuthenticated = false;
                $http.defaults.headers.common['X-Auth-Token'] = undefined;
                window.localStorage.removeItem(LOCAL_TOKEN_KEY);
                window.sessionStorage.removeItem('user');
            }

            function getInstitucion() {
                return this.institucion;
            }
            ;


            var login = function (name, pw, rol) {

                return $q(function (resolve, reject) {
// alert(Boolean(consultarLogin(name, pw, rol)));
                    // if (consultarLogin(name, pw, rol) === true) {
                    //      // Make a request and receive your auth token from your server

                    //      storeUserCredentials(name + '.yourServerToken');
                    //      resolve('Login success.');
                    //    } else {

                    //      reject('Login Failed.');
                    //    }
//destroyUserCredentials();
                    try {

                        $http({
                            method: 'GET',
                            url: HOST_NAME.URL + "/RestPlanurricular/resources/consultarLogin/" + name + "_" + pw + "_" + rol
                        }).then(function successCallback(result) {

                            if (typeof result.data[0] === "undefined") {
                                reject('Usuario no registrado');
                                return;
                            }

                            storeUserCredentials(name + '.' + rol + '.yourServerToken');
                            setUser(result.data);

//     usercards=result.data[0];

                            resolve('Login success.');


                        }, function errorCallback(result) {
                            reject('Login Failed.');
                        });

                    } catch (e) {
                     console.log(e);
                    }

                    // request.then( handleSuccess, handleError );
                });


            };


            var logout = function () {
                destroyUserCredentials();
            };

            var isAuthorized = function (authorizedRoles) {
                if (!angular.isArray(authorizedRoles)) {
                    authorizedRoles = [authorizedRoles];
                }
                return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
            };

            loadUserCredentials();

            return {
                login: login,
                logout: logout,
                isAuthorized: isAuthorized,
                isAuthenticated: function () {
                    return isAuthenticated;
                },
                username: function () {
                    return username;
                },
                institucion: function () {
                    return institucion;
                },
                usercards: function () {
                    return usercards;
                },
                role: function () {
                    return role;
                },
                menus: function () {
                    return menus;
                }
            };
        })


        .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
            return {
                responseError: function (response) {
                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated,
                        403: AUTH_EVENTS.notAuthorized
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        })


// .factory('login', ['$http', function($http, HOST_NAME) { 
//   return $http.get(HOST_NAME.URL+'/consultarLogin/') 
//             .success(function(data) { 
//               return data; 
//             }) 
//             .error(function(err) { 
//               return err; 
//             }); 
// }])



        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });

