/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('empresas')
        .controller('EsperaServicioCtrl', EsperaServicioCtrl);

    /* @ngInject */
    function EsperaServicioCtrl($rootScope, $scope, $interval) {
        var vm = this;
        vm.tTranscurrido = 0;
        var timer;

        $scope.$on('$ionicView.loaded', function () {
            starttimer();
        });

        $rootScope.$on('contarstart', function () {
            starttimer();
        });

        $rootScope.$on('servicio_aceptado', function () {
            servicio_aceptado();
        });

        $rootScope.$on('vehiculo_en_camino', function () {
            espera_vehiculo();
        });

        function starttimer() {
            timer = $interval(function () {
                vm.tTranscurrido++;
            }, 1000);
        }

        function servicio_aceptado() {

        }

        function espera_vehiculo() {
            
        }

    }
})();