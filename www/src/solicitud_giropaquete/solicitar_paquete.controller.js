/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('solicitud_giropaquete')
        .controller('SolicitarPaqueteCtrl', SolicitarPaqueteCtrl);

    function SolicitarPaqueteCtrl($scope, $ionicLoading, $stateParams, geoLocationService,
                                  solicitudVehiculoService, authService, mostarAlert) {
        var vm = this;
        vm.paquete = true;
        vm.ciudades = [];
        vm.solicitud= {};

        vm.loadCupos = loadCupos;
        vm.enviarSolicitud = enviarSolicitud;

        $scope.$on('$ionicView.loaded',function(){
            $ionicLoading.show();
            geoLocationService.current().then(function(pos){
                vm.location = pos;
                loadCiudades();
            },function(error) {});
        });

        function loadCiudades(){
            vm.centralLocal = {};
            var empresa_id = $stateParams.empresa_id;
            solicitudVehiculoService.getCentral(empresa_id, 'Valledupar').then(success, error);
            function success(p) {
                vm.centralLocal = p.data;
                loadRutas();
            }
            function error(error) {
                console.log('Error al cargar datos', error);
                $ionicLoading.hide();
            }
        }

        function loadRutas(){
            solicitudVehiculoService.getRutasCentral(vm.centralLocal.id).then(success, error);
            function success(p){
                for(var i=0; i < p.data.length; i++){
                    vm.ciudades.push({
                        ruta_id: p.data[i].id,
                        central_id: p.data[i].destino.id,
                        nombre_ciudad: p.data[i].destino.ciudad.nombre
                    });
                }
                $ionicLoading.hide();
            }
            function error(error) {
                console.log('Error al cargar datos', error);
                $ionicLoading.hide();
            }
        }

        function loadCupos(ruta_id){
            $ionicLoading.show();
            vm.sin_cupos = false;
            vm.n_conductores_ruta = 0;
            solicitudVehiculoService.getTurnos(ruta_id).then(success, error);
            function success(p){
                vm.n_conductores_ruta = p.data.length;
                vm.solicitud.ruta_id = ruta_id;
                if(!vm.n_conductores_ruta) {
                    vm.sin_cupos = true;
                }
                $ionicLoading.hide();
            }
            function error(error) {
                $ionicLoading.hide();
                console.log('Error al cargar datos', error);
            }
        }

        function enviarSolicitud(){
            vm.solicitud.direccion_recogida = vm.location.direccion;
            vm.solicitud.ciudad_direccion = vm.location.ciudad;
            vm.solicitud.central_id = vm.centralLocal.id;
            vm.solicitud.tipo = 'paquete';
            solicitudVehiculoService.post(vm.solicitud).then(success, error);
            function success(p) {
                mostarAlert('', 'Solicitud Enviada');
            }
            function error(error) {

            }
        }
    }
})();
