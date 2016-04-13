/**
 * Created by tav0 on 23/03/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .run(runconfig)


    /* @ngInject */
    function runconfig($ionicPlatform, $cordovaPush, $rootScope, authService) {
        $ionicPlatform.ready(function() {
            $rootScope.$on('$cordovaPush:notificationReceived', notificationReceived);
        });
        function notificationReceived(event, notification) {
            switch (notification.event) {
                case 'registered':
                    if (notification.regid.length > 0) {
                        //alert('registration ID = ' + notification.regid);
                        authService.updateRegId(notification.regid);
                    }
                    break;

                case 'message':
                    switch (notification.payload.tipo) {
                        case 'Confrimacion':
                            $rootScope.$emit('servicio_aceptado');
                            break;
                        case 'Rechazo':
                            $rootScope.$emit('servicio_rechazado');
                            break;
                    }
                    break;

                case 'error':
                    alert('GCM error = ' + notification.msg);
                    break;

                default:
                    alert('An unknown GCM event has occurred');
                    break;
            }
        }
    }
})();
