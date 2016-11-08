/**
 * Created by tav0 on 12/04/16.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .service('pushService', pushService);

    /* @ngInject */
    function pushService($cordovaPush, $ionicPlatform) {
        var config = null;
        var service = {
            register: register,
        };
        return service;

        function register() {
            // return; // todo: quitar
            $ionicPlatform.ready(function () {
                if (ionic.Platform.isAndroid()) {
                    config = {
                        "senderID": "984044898845"
                    };
                } else if (ionic.Platform.isIOS()) {
                    config = {
                        "badge": "true",
                        "sound": "true",
                        "alert": "true"
                    };
                }

                $cordovaPush.register(config).then(success, error);
                function success(result) {
                    console.log('ready push ' + result);
                    localStorage.setItem('regid', result.regid);
                    if (ionic.Platform.isIOS()) {
                    }

                }
                function error(err) {
                    console.log("Register error " + err)
                }
            });
        }
    }
})();
