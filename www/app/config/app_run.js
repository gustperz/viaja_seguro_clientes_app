    /**
 * Created by tav0 on 23/03/16.
 */

    (function() {
        'use strict';

        angular
            .module('app')
            .run(appRun);


        /* @ngInject */
        function appRun($ionicPlatform, $state, authService, $ionicLoading) {
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

                autenticate();
            });

           function autenticate(){
               if(!authService.currentUser()) {
                   $ionicLoading.show();
                   authService.autologin().then(function (res) {
                       if (res === false) $state.go('login');
                       $ionicLoading.hide();
                   })
               }
            }
        }
    })();
