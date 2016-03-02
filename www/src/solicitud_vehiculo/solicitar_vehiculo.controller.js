/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('solicitud_vehiculo')
        .controller('SolicitarVehiculoCtrl', SolicitarVehiculoCtrl);

    function SolicitarVehiculoCtrl($scope, $ionicLoading, $stateParams, geoLocationService,
                                   solicitudVehiculoService, authService) {
        var vm = this;
        var conductoresRuta = [];
        $scope.$on('$ionicView.loaded',function(){
            vm.ciudades = [];
            var user = authService.currentUser();
            vm.pasajeros = [{'nombre': user.nombre, identificacion: user.identificacion}];
            vm.numero_pasajeros = 1;

            geoLocationService.current().then(function(pos){
                vm.location = pos;
                loadCiudades();
            },function(error) {});
            vm.loadCupos = loadCupos;
            vm.refreshPasajeros = refreshPasajeros;
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
                    conductoresRuta[p.data[i].id] = p.data[i].turnos;
                    $ionicLoading.hide();
                }
            }
            function error(error) {
                console.log('Error al cargar datos', error);
                $ionicLoading.hide();
            }
        }

        function loadCupos(ruta_id){
            vm.sin_cupos = false;
            vm.conductores_ruta = 0;
            vm.cupos_disponibles = 0;
            vm.cupos_disponibles_siguiente = 0;
            if(conductoresRuta[ruta_id].length) {
                vm.conductores_ruta = conductoresRuta[ruta_id].length;
                vm.conductor_id = conductoresRuta[ruta_id][0].conductor_id;
                solicitudVehiculoService.getCupos(vm.conductor_id).then(success, error);
            }else{
                vm.sin_cupos = true;
            }
            function success(p){
                vm.cupos_disponibles = p.data;
                if(vm.conductores_ruta > 1){
                    vm.conductor2_id = conductoresRuta[ruta_id][1].conductor_id;
                    solicitudVehiculoService.getCupos(vm.conductor2_id).then(success2, error);
                }

            }
            function success2(p){
                vm.cupos_disponibles_siguiente = p.data;
                if(vm.cupos_disponibles == 0 && (!vm.cupos_disponibles_siguiente || vm.cupos_disponibles_siguiente == 0)){
                    vm.sin_cupos = true;
                }
            }
            function error(error) {
                console.log('Error al cargar datos', error);
            }
        }

        function refreshPasajeros(){
            if(vm.numero_pasajeros < 1){
                return vm.numero_pasajeros = 1;
            }else {
                if(vm.pasajeros.length < vm.numero_pasajeros) {
                    var num = vm.pasajeros.length;
                    for (var i = 0; i < vm.numero_pasajeros-num; i++) {
                        vm.pasajeros.push({'nombre': '', identificacion: ''});
                    }
                } else {
                    vm.pasajeros = vm.pasajeros.slice(vm.numero_pasajeros, vm.pasajeros.length-1);
                }
            }
        }

    }
})();
