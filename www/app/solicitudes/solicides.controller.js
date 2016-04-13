/**
 * Created by tav0 on 4/02/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitudes')
        .controller('SolicitudesCtrl', SolicitudesCtrl);

    /* @ngInject */
    function SolicitudesCtrl($scope, $ionicLoading, $stateParams, geoLocationService, $state, $rootScope,
                                   solicitudesService, mostrarAlert, Solicitud, $ionicHistory) {
        var vm = this;
        var conductoresRuta = [];
        vm.ciudades = [];
        vm.solicitud = Solicitud;

        vm.loadCupos = loadCupos;
        vm.enviarSolicitud = enviarSolicitud;

        $scope.$on('$ionicView.beforeEnter', function (event) {
            $ionicLoading.show();
            geoLocationService.checkLocation().then(function (res) {
                if(!res){
                    $ionicLoading.hide();
                    $ionicHistory.goBack();
                } else {
                    geoLocationService.current().then(function (pos) {
                        vm.location = pos;
                        loadCiudades();
                    }, function (error) {
                    });
                }
            })
        });

        function loadCiudades() {
            vm.centralLocal = {};
            var empresa_id = $stateParams.empresa_id;
            solicitudesService.getCentral(empresa_id, 'Valledupar').then(success, error);
            function success(p) {
                vm.centralLocal = p.data;
                loadRutas();
            }

            function error(error) {
                console.log('Error al cargar datos', error);
                $ionicLoading.hide();
            }
        }

        function loadRutas() {
            solicitudesService.getRutasCentral(vm.centralLocal.id).then(success, error);
            function success(p) {
                for (var i = 0; i < p.data.length; i++) {
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

        function loadCupos(ruta_id) {
            $ionicLoading.show();
            vm.sin_cupos = false;
            vm.n_conductores_ruta = 0;
            vm.cupos_disponibles = 0;
            vm.cupos_disponibles_siguiente = 0;
            solicitudesService.getTurnos(ruta_id).then(function (p) {
                vm.n_conductores_ruta = p.data.length;
                if (vm.n_conductores_ruta) {
                    conductoresRuta = p.data;
                    vm.conductor_id = conductoresRuta[0].conductor_id;
                    solicitudesService.getCupos(vm.conductor_id).then(success, error);
                } else {
                    vm.sin_cupos = true;
                    $ionicLoading.hide();
                }
            }, error);
            function success(p) {
                vm.cupos_disponibles = p.data;
                Solicitud.data.ruta_id = ruta_id;
                $ionicLoading.hide();
                if (vm.n_conductores_ruta > 1) {
                    vm.conductor2_id = conductoresRuta[1].conductor_id;
                    solicitudesService.getCupos(vm.conductor2_id).then(success2, error);
                }

            }

            function success2(p) {
                vm.cupos_disponibles_siguiente = p.data;
                if (vm.cupos_disponibles === 0 && (!vm.cupos_disponibles_siguiente || vm.cupos_disponibles_siguiente === 0)) {
                    vm.sin_cupos = true;
                }
            }

            function error(error) {
                $ionicLoading.hide();
                console.log('Error al cargar datos', error);
            }
        }

        function enviarSolicitud() {
            Solicitud.data.direccion_recogida = vm.location.direccion;
            Solicitud.data.latitud = vm.location.latitude;
            Solicitud.data.longitud = vm.location.longitude;
            Solicitud.data.ciudad_direccion = vm.location.ciudad;
            Solicitud.data.central_id = vm.centralLocal.id;
            solicitudesService.post(Solicitud.data).then(success, error);
            function success() {
                mostrarAlert('', 'Solicitud Enviada', function () {
                    $rootScope.$emit('contarstart');
                    $state.go('app.espera_servicio');
                });
            }

            function error(error) {

            }
        }
    }
})();
