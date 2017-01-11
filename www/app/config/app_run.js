    /**
 * Created by tav0 on 23/03/16.
 */

    (function() {
        'use strict';

        angular
            .module('app')
            .run(appRun);

        /* @ngInject */
        function appRun($ionicPlatform, $state, authService, $ionicLoading, Solicitud, HOME, solicitudesService, $rootScope, $ionicHistory) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                    screen.lockOrientation('portrait');
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
                $rootScope.$ionicGoBack = function(backCount) {
                    $ionicHistory.goBack(backCount);
                };

            });

            autenticate();

            function autenticate(){
               if(!authService.currentUser()) {
                   authService.autologin().then(function (res) {
                       hideSplash();
                       if (res) {
                           solicitudPendiente();
                       }else{
                           $state.go('login');
                       }
                   })
               }
            }

            function solicitudPendiente() {
                solicitudesService.getLast().then(function (s) {
                    $ionicLoading.hide();
                    if(s.createdAt){
                        Solicitud.data = s;
                        Solicitud.estado = s.estado;
                        var d = new Date(Solicitud.data.createdAt);
                        var min = Math.ceil((new Date() - d) / (1000*60))
                        Solicitud.tTranscurrido = min;
                        $state.go('app.espera_servicio');

                    }else if (localStorage.getItem('vehiculo_en_camino')) {
                      Solicitud = JSON.parse(localStorage.getItem('vehiculo_en_camino'));
                      var d = new Date(Solicitud.data.createdAt);
                      var min = Math.ceil((new Date() - d) / (1000*60))
                      Solicitud.tTranscurrido = min;
                      $state.go('app.espera_servicio');
                    }else{
                        $state.go(HOME);
                    }
                });
                $ionicLoading.hide();
                $state.go(HOME);
            }

            function hideSplash() {
                $ionicPlatform.ready(function() {
                    setTimeout(function() {
                        navigator.splashscreen.hide();
                    }, 300);
                });
            }
        }
    })();
