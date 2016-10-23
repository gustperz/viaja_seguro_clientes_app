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

        $scope.$on('$ionicView.beforeEnter', function () {
            loadSolicitud();
        });

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

        $rootScope.$on('servicio_rechazado', function (mensaje) {
            servicio_rechazado(mensaje);
        });

        $rootScope.$on('vehiculo_en_camino', function () {
            espera_vehiculo();
        });

        function loadSolicitud() {
            solicitudesService.getLast().then(function (s) {
                // sino esta finalizada (f) o cancelada (c)
                if(s.data && (['f', 'c', 'r'].indexOf(s.data.estado) === -1)){
                    Solicitud.data = s.data;
                    Solicitud.estado = s.data.estado;
                    var t = s.data.created_at.split(/[- :]/);
                    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
                    var min = Math.ceil((new Date - d) / (1000*60))
                    Solicitud.tTranscurrido = min;
                }
            });
        }

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
            vm.solicitud.estado = 'a'
            console.log(solicitud);
            alert('solicitud aceptada');
        }

        function servicio_rechazado(mensaje) {
            alert('solicitud rechazada\n' + mensaje);
        }

        function espera_vehiculo() {
            vm.solicitud.estado = 'v'
            loadSolicitud();
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
