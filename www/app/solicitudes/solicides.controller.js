/**
 * Created by tav0 on 4/02/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitudes')
        .controller('SolicitudesCtrl', SolicitudesCtrl);

    /* @ngInject */
    function SolicitudesCtrl($scope, $ionicLoading, $stateParams, geoLocationService, $state, $rootScope, authService,
                                   solicitudesService, mostrarAlert, Solicitud, $ionicHistory, posicionActual) {
        var vm = this;
        var conductoresRuta = [];
        vm.ciudades = [];
        var indexCiudades = {};
        vm.solicitud = Solicitud;

        vm.loadCupos = loadCupos;
        vm.enviarSolicitud = enviarSolicitud;
        vm.checkLength = checkLength;

        $scope.$on('$ionicView.beforeEnter', function () {
            geoLocationService.checkLocation().then(function (res) {
                if(!res){
                    $ionicLoading.hide();
                    $ionicHistory.goBack();
                } else {
                    vm.location = posicionActual;
                    console.log(posicionActual);
                    if(!posicionActual.latitude || !posicionActual.longitude){
                        $ionicLoading.show();
                        geoLocationService.current().then(function(){
                            loadCiudades();
                        },function(error) {
                            console.log(error);
                            $ionicLoading.hide();
                        });
                    }
                    else {
                        loadCiudades();
                    }
                }
            })
        });

        function loadCiudades() {
            if(vm.centralLocal){
                loadRutas();
                return;
            }
            var empresa_id = $stateParams.empresa_id;
            solicitudesService.getCentral(empresa_id, vm.location.place_id).then(success, error);
            function success(p) {
                vm.centralLocal = p.data.data[0];
                loadRutas();
            }

            function error(error) {
                console.log('Error al cargar datos', error);
                $ionicLoading.hide();
            }
        }

        function loadRutas() {
            if(vm.ciudades.length){
                $ionicLoading.hide();
                return
            };
            solicitudesService.getRutasCentral(vm.centralLocal.id).then(success, error);
            function success(p) {
                for (var i = 0; i < p.data.data.length; i++) {
                    vm.ciudades.push({
                        ruta_id: p.data.data[i].id,
                        central_id: p.data.data[i].central,
                        nombre_ciudad: p.data.data[i].destino.ciudad,
                        codigo:  p.data.data[i].destino.ciudad_place_id
                    });
                    indexCiudades[p.data.data[i].id] = i;
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
                p.data = p.data.data;
                vm.n_conductores_ruta = p.data.length;
                if (vm.n_conductores_ruta) {
                    conductoresRuta = p.data;
                    vm.conductor_id = conductoresRuta[0].conductor.id;
                    vm.codigo_ruta = vm.ciudades[indexCiudades[ruta_id]].codigo;
                    // solicitudesService.getCupos(vm.conductor_id).then(success, error);
                    success({data: 4})
                } else {
                    vm.telRuta = vm.ciudades[indexCiudades[ruta_id]].telefono;
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
                    // solicitudesService.getCupos(vm.conductor2_id).then(success2, error);
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
            var solicitud = {};
            solicitud.conductor = vm.conductor_id;
            solicitud.codigo_ruta = vm.codigo_ruta;
            solicitud.direccion = vm.location.direccion+' '+vm.location.direccion_detalles;
            solicitud.tipo = 'Pasajeros';
            solicitud.estado = 'p';
            solicitud.cliente = authService.currentUser().identificacion;
            solicitud.pasajeros = Solicitud.data.pasajeros;
            solicitud.central = vm.centralLocal.id;

            solicitudesService.post(solicitud).then(success);
            function success(p) {
                mostrarAlert('', 'Solicitud Enviada', function () {
                    Solicitud.estado = 'p';
                    Solicitud.data.id = p.data;
                    $rootScope.$emit('contarstart');
                    $state.go('app.espera_servicio');
                });
            }
        }

        function checkLength() {
            if(vm.location.direccion.indexOf(vm.location.basedir)!== 0){
                vm.location.direccion = vm.location.basedir;
            }
        }
    }
})();
