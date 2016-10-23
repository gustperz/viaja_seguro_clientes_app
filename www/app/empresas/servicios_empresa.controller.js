/**
 * Created by tav0 on 4/02/16.
 */

(function () {
    'use strict';

    angular
        .module('empresas')
        .controller('ServiciosCtrl', ServiciosCtrl);

    /* @ngInject */
    function ServiciosCtrl($scope, $stateParams, empresasService, Solicitud) {
        var vm = this;

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });
        $scope.$on('$ionicView.loaded', function () {
            vm.empresa = {};
            Solicitud.data = {};
            loadInfo();
        });

        function loadInfo() {
            empresasService.get($stateParams.empresa_id).then(success, error);
            function success(p) {
                vm.empresa = p.data;
                for (var i = 0; i < vm.empresa.servicios.length; i++) {
                    switch (vm.empresa.servicios[i].concepto) {
                        case "Reservas de pasajes":
                            vm.pasajeros = true;
                            break;
                        case "Encomiendas":
                            vm.encomiendas = true;
                            break;
                        case "Giros":
                            vm.giros = true;
                            break;
                    }
                }
            }

            function error(error) {
                console.log('Error al cargar empresa', error);
            }
        }

    }
})();
