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
                                $state, HOME, $sails, $cordovaLocalNotification) {
        var vm = this;
        var timer;
        vm.solicitud = Solicitud;

        vm.cancelarSolicitud = cancelarSolicitud;
        vm.recogido = recogido;

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

        $sails.on('updateEstado', function (params) {
            if(params.estado == 'p'){
              vm.solicitud.estado = 'p'
              notificate('Solicitud pendiente', 'esperando la disponibilidad de un conductor ');
              alert('solicitud en espera');
            }

            if(params.estado == 'a') {
              vm.solicitud.estado = 'a'
              notificate('Solicitud asignada', 'ha sido asignado a un conductor, al completar el cupo, se realizara el despacho ');
              alert('solicitud aceptada');
            };
        });

       $sails.on('reject', function (mensaje) {
         notificate('Solicitud rechazada', 'No puede ser atendido en este momento');
         alert('solicitud rechazada\n');
         $state.go(HOME);
       });

       $sails.on('vehiculo_en_camino', function () {
         vm.solicitud.estado = 'v'
         notificate('Vehiculo en camino', 'El conductor ya salio, llegara pronto por usted');
         alert('vehiculo en camino');
         localStorage.setItem('vehiculo_en_camino', JSON.stringify(Solicitud));
        });

        function loadSolicitud() {
          if(Solicitud.stada == 'v') return;
            solicitudesService.getLast().then(function (data) {
              Solicitud.data = data;
              Solicitud.estado = data.estado;
              var d = new Date(Solicitud.data.createdAt);
              var min = Math.ceil((new Date() - d) / (1000*60))
              Solicitud.tTranscurrido = min;
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

        function cancelarSolicitud() {
            console.log(Solicitud);
            vm.tTranscurrido = 0;
            $interval.cancel(timer);
            timer = undefined;
            solicitudesService.cancel(Solicitud.data.id).then(success, error);
            function success() {
                $state.go(HOME);
            }
            function error() {

            }
        }

        function recogido() {
            console.log(Solicitud);
            vm.tTranscurrido = 0;
            $interval.cancel(timer);
            timer = undefined;
            $state.go(HOME);
        }

        function notificate(title, text) {
          $cordovaLocalNotification.clearAll();
          $cordovaLocalNotification.schedule({
            title: title,
            text: text,
            icon: "http://api.viajaseguro.co/images/icono.png",
          }).then(function (result) {
            // ...
          });
        }

    }
})();
