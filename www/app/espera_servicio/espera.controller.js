/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('empresas')
        .controller('EsperaServicioCtrl', EsperaServicioCtrl);

    /* @ngInject */
    function EsperaServicioCtrl($rootScope, $scope, $interval, $ionicHistory, solicitudesService, Solicitud,
                                $state, HOME) {
        var vm = this;
        var timer;
        vm.solicitud = Solicitud;

        vm.cancelarSolicitud = cancelarSolicitud;

        $scope.$on('$ionicView.loaded', function () {
            $ionicHistory.clearHistory()
            starttimer();
        });

        $rootScope.$on('contarstart', function () {
            starttimer();
        });

        $rootScope.$on('servicio_aceptado', function () {
            servicio_aceptado();
        });

        $rootScope.$on('servicio_rechazado', function () {
            servicio_rechazado();
        });

        $rootScope.$on('vehiculo_en_camino', function () {
            espera_vehiculo();
        });

        function starttimer() {
            timer = $interval(function () {
                vm.solicitud.tTranscurrido++;
            }, 60000);
            activeBGS();
        }

        function activeBGS() {
            // $ionicPlatform.ready(function() {
            //     cordova.plugins.backgroundMode.setDefaults({title:  'Viaja Seguro'});
            //     cordova.plugins.backgroundMode.enable();
            //     cordova.plugins.backgroundMode.onactivate = function () {
            //         switch (Solicitud.estado){
            //             case 'p':
            //                 solicitud_enviada;
            //                 break;
            //             case 'a':
            //                 servicio_aceptado;
            //                 break;
            //             case 'r':
            //                 solicitud_enviada;
            //                 break;
            //         }
            //     }
            // });
        }

        function solicitud_enviada() {
            cordova.plugins.backgroundMode.configure({
                text:'Solicitud enviada, esperando respuesta'
            });
        }

        function servicio_aceptado() {
            Solicitud.estado = 'a'
            alert('solicitud aceptada');
        }

        function servicio_rechazado() {
            alert('solicitud rechazada');
        }

        function espera_vehiculo() {
            Solicitud.estado = 'v'
            alert('vehiculo en camino');
        }

        function cancelarSolicitud() {
            console.log(Solicitud);
            vm.tTranscurrido = 0;
            $interval.cancel(timer);
            timer = undefined;
            solicitudesService.put({'estado': 'c', 'id': Solicitud.data.id}).then(success, error);
            function success() {
                $state.go(HOME);
            }
            function error() {

            }
        }

    }
})();