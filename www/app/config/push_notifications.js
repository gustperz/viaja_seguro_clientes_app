/**
 * Created by tav0 on 23/03/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .config(config)


    /* @ngInject */
    function config($cordovaPush) {
        var config = null;

        if (ionic.Platform.isAndroid()) {
            config = {
                "senderID": "984044898845"
            };
        }else if (ionic.Platform.isIOS()) {
            config = {
                "badge": "true",
                "sound": "true",
                "alert": "true"
            };
        }

        $cordovaPush.register(config).then(function (result) {
            if (ionic.Platform.isIOS()) {}

        }, function (err) {
            //alert("Register error " + err)
        });

        $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
            switch(notification.event) {
                case 'registered':
                    if (notification.regid.length > 0 ) {
                        //alert('registration ID = ' + notification.regid);
                        sessionStorage.setItem('regid', notification.regid);
                    }
                    break;

                case 'message':
                    if(notification.payload.tipo == "Pasajeros"){
                        $location.path("/pasajeros");
                    }else if(notification.payload.tipo == "Paquetes"){
                        $location.path("/encomienda");
                    }else if(notification.payload.tipo == "Giros"){
                        $location.path("/giro");
                    }

                    break;

                case 'error':
                    alert('GCM error = ' + notification.msg);
                    break;

                default:
                    alert('An unknown GCM event has occurred');
                    break;
            }
        });
    }
})();
