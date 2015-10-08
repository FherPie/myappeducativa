// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngResource', 'ui.router'])
        .config(function ($stateProvider, $urlRouterProvider, USER_ROLES, $ionicConfigProvider, $resourceProvider) {

            // $ionicConfigProvider.tabs.position('bottom');
            // Don't strip trailing slashes from calculated URLs
            $resourceProvider.defaults.stripTrailingSlashes = false;
            $stateProvider

                    // .state('app', {
                    //   url: '/',
                    //   abstract: true,
                    //   templateUrl: 'templates/menu.html',
                    //   controller: 'AppCtrl'
                    // })

                    // .state('app.search', {
                    //   url: '/search',
                    //   views: {
                    //     'menuContent': {
                    //       templateUrl: 'templates/search.html'
                    //     }
                    //   }
                    // })

                    // .state('app.educacion', {
                    //     url: '/educacion',
                    //     views: {
                    //       'menuContent': {
                    //         templateUrl: 'templates/educacion.html'
                    //       }
                    //     }
                    //   })

// .state('app.grupos', {
//       url: '/grupos',
//       views: {
//         'menuContent': {
//           templateUrl: 'templates/grupos.html',
//           controller: 'listagrupos'
//         }
//       }
//     })

// .state('app.principal', {
//       url: '/principal',
//       views: {
//         'menuContent': {
//           templateUrl: 'templates/principal.html',
//           controller: 'principal'
//         }
//       //      'dash-tab': {
//       //     templateUrl: 'templates/principal.html',
//       //     controller: 'principal'
//       //   }
//       // }
// })

// .state('app.profesor', {
//       url: '/profesor',
//       views: {
//         'menuContent': {
//           templateUrl: 'templates/profesor.html',
//           controller: 'profesor'
//         },
//            'public-tab': {
//           templateUrl: 'templates/profesor.html',
//           controller: 'profesor'
//         }
//       }
// })
// .state('app.login', {
//       url: '/login',
//       views: {
//         'menuContent': {
//           templateUrl: 'templates/login.html',
//           controller: 'LoginCtrl'
//         }
//       }
// })
                    .state('login', {
                        url: '/login/:rol',
                        templateUrl: 'templates/login.html',
                        controller: 'LoginCtrl'
                    })

                    // .state('app.single', {
                    //   url: '/grupos/:playlistId',
                    //   views: {
                    //     'menuContent': {
                    //       templateUrl: 'templates/playlist.html',
                    //       controller: 'PlaylistCtrl'
                    //     }
                    //   }
                    // })
                    .state('principal', {
                        url: '/principal',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'principal'
                    })
                    .state('principal.tablero', {
                        url: '/tablero',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/tablero.html',
                                controller: 'tablero'
                            }
                        }
                    })
                    .state('principal.educacion', {
                        url: '/educacion',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/educacion.html',
                                controller: 'profesor'
                            }
                        },
                        data: {
                            authorizedRoles: [USER_ROLES.profesor]
                        }
                    })
                    .state('principal.mensajesnoleidosVista', {
                        url: '/mensajesnoleidosVista',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/mensajesnoleidosVista.html',
                                controller: 'mensajesnoleidosCtrl'
                            }
                        },
                        data: {
                            authorizedRoles: [USER_ROLES.profesor]
                        }
                    })
                    .state('principal.profesorasignatura', {
                        url: '/profesorasignatura',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/profesorasignatura.html',
                                controller: 'profesorasignatura'
                            }
                        },
                        data: {
                            authorizedRoles: [USER_ROLES.profesor]
                        }
                    })
                    .state('principal.alumno', {
                        url: '/alumno',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/alumno.html',
                                controller: 'alumno'
                            }
                        },
                        data: {
                            authorizedRoles: [USER_ROLES.estudiante]
                        }
                    })
                    .state('principal.appInfo', {
                        url: '/appInfo',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/appInfo.html',
                                controller: 'appinfo'
                            }
                        },
                        data: {
                            authorizedRoles: [USER_ROLES.estudiante]
                        }
                    })
                    .state('principal.mensaje', {
                        url: '/mensaje?id',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/mensaje.html',
                                controller: 'mensaje'
                            }
                        }
                    })
                    .state('gruposusuarios', {
                        url: '/gruposusuarios',
                        templateUrl: 'templates/gruposusuarios.html',
                        controller: 'gruposusuarios'

                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise(function ($injector, $location) {
                var $state = $injector.get("$state");
                $state.go("gruposusuarios");
            });
        })


        .run(function ($rootScope, $state, AuthService, AUTH_EVENTS, $location) {
            $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
                if ('data' in next && 'authorizedRoles' in next.data) {
                    var authorizedRoles = next.data.authorizedRoles;
                    if (!AuthService.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        $state.go($state.current, {}, {reload: true});
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    }
                }
                ;

                if (!AuthService.isAuthenticated()) {
                    // alert("Please you can't enter her");
                    if (next.name !== 'gruposusuarios') {
                        event.preventDefault();
                        $state.go('gruposusuarios');
                    }
                }
            });

        })


        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }


            });



// $httpBackend.whenGET('http://localhost:8100/valid')
//         .respond({message: 'This is my valid response!'});
// $httpBackend.whenGET('http://localhost:8100/notauthenticated')
//         .respond(401, {message: "Not Authenticated"});
// $httpBackend.whenGET('http://localhost:8100/notauthorized')
//         .respond(403, {message: "Not Authorized"});

// $httpBackend.whenGET(/templates\/\w+.*/).passThrough();



        })














        ;
