    /**
 * Created by tav0 on 23/03/16.
 */

    (function() {
        'use strict';

        angular
            .module('app')
            .run(appRun);


        /* @ngInject */
        function appRun($ionicPlatform, $rootScope, jwtHelper, $state) {
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

            $rootScope.$on('$stateChangeStart', function(e, to) {
                if (!to.data || !to.data.noRequiresLogin) {
                    var jwt = sessionStorage.getItem('jwt');
                    if (!jwt || jwtHelper.isTokenExpired(jwt)) {
                        e.preventDefault();
                        $state.go('login');
                    }
                }
            });
        }
    })();
