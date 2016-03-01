/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('solicitud_vehiculo')
        .controller('ConductorCtrl', ConductorCtrl);

    function ConductorCtrl($scope, $stateParams, ConductorService) {
        var vm = this;
        $scope.$on('$ionicView.loaded',function(){
            loadDatosconductor();
        });

        function loadDatosconductor(){
            ConductorService.get($stateParams.conductor_id).then(success, error);
            function success(p) {
                ConductorService.getVehiculoConductor($stateParams.conductor_id).then(successVehiculo, error);
                vm.conductor = p.data;
            }
            function successVehiculo(p) {
                vm.vehiculo = p.data;
            }
            function error(error) {
                console.log('Error al cargar datos', error);
            }
        }

    }
})();
