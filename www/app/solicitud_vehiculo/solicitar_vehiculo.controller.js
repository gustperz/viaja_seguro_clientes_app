/**
 * Created by tav0 on 4/02/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitud_vehiculo')
        .controller('SolicitarVehiculoCtrl', SolicitarVehiculoCtrl);

    /* @ngInject */
    function SolicitarVehiculoCtrl($scope, $ionicLoading, $stateParams, geoLocationService, $state, $rootScope,
                                   solicitudVehiculoService, authService, mostrarAlert, $ionicPopup) {
        var vm = this;
        var conductoresRuta = [];
        vm.ciudades = [];
        vm.solicitud = {};

        vm.user = authService.currentUser();
        vm.solicitud.pasajeros = [{'nombre': vm.user.nombre, identificacion: vm.user.identificacion}];

        vm.loadCupos = loadCupos;
        vm.enviarSolicitud = enviarSolicitud;
        vm.showModalAddPasajero = showModalAddPasajero;
        vm.showModalEditPasajero = showModalEditPasajero;

        $scope.$on('$ionicView.loaded', function () {
            $ionicLoading.show();
            geoLocationService.current().then(function (pos) {
                vm.location = pos;
                loadCiudades();
            }, function (error) {
            });
        });

        function loadCiudades() {
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

        function loadRutas() {
            solicitudVehiculoService.getRutasCentral(vm.centralLocal.id).then(success, error);
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
            solicitudVehiculoService.getTurnos(ruta_id).then(function (p) {
                vm.n_conductores_ruta = p.data.length;
                if (vm.n_conductores_ruta) {
                    conductoresRuta = p.data;
                    vm.conductor_id = conductoresRuta[0].conductor_id;
                    solicitudVehiculoService.getCupos(vm.conductor_id).then(success, error);
                } else {
                    vm.sin_cupos = true;
                    $ionicLoading.hide();
                }
            }, error);
            function success(p) {
                vm.cupos_disponibles = p.data;
                vm.solicitud.ruta_id = ruta_id;
                $ionicLoading.hide();
                if (vm.n_conductores_ruta > 1) {
                    vm.conductor2_id = conductoresRuta[1].conductor_id;
                    solicitudVehiculoService.getCupos(vm.conductor2_id).then(success2, error);
                }

            }

            function success2(p) {
                vm.cupos_disponibles_siguiente = p.data;
                if (vm.cupos_disponibles == 0 && (!vm.cupos_disponibles_siguiente || vm.cupos_disponibles_siguiente == 0)) {
                    vm.sin_cupos = true;
                }
            }

            function error(error) {
                $ionicLoading.hide();
                console.log('Error al cargar datos', error);
            }
        }

        function enviarSolicitud() {
            vm.solicitud.direccion_recogida = vm.location.direccion;
            vm.solicitud.latitud = vm.location.latitude;
            vm.solicitud.longitud = vm.location.longitude;
            vm.solicitud.ciudad_direccion = vm.location.ciudad;
            vm.solicitud.central_id = vm.centralLocal.id;
            vm.solicitud.tipo = 'vehiculo';
            success();
            // solicitudVehiculoService.post(vm.solicitud).then(success, error);
            function success() {
                mostrarAlert('', 'Solicitud Enviada', function () {
                    $rootScope.$emit('contarstart');
                    $state.go('app.esperar');
                });
            }

            function error(error) {

            }
        }

        function showModalAddPasajero() {
            $scope.pasajero = {};
            var popup = {
                templateUrl: 'app/solicitud_vehiculo/modal_pasajero.html',
                title: 'Agregar pasajero',
                scope: $scope
            };
            if (vm.solicitud.pasajeros.length < 1) {
                popup.buttons = [
                    {
                        type: 'button-icon ion-plus button-positive button-clear',
                        onTap: function (e) {
                            if (!$scope.pasajero.nombre || !$scope.pasajero.identificacion) {
                                e.preventDefault();
                            } else {
                                return $scope.pasajero;
                            }
                        }
                    }
                ];
            } else {
                popup.buttons = [
                    {type: 'button-icon ion-reply button-positive button-clear'},
                    {
                        type: 'button-icon ion-plus button-positive button-clear',
                        onTap: function (e) {
                            if (!$scope.pasajero.nombre || !$scope.pasajero.identificacion) {
                                e.preventDefault();
                            } else {
                                return $scope.pasajero;
                            }
                        }
                    }
                ];
            }
            var myPopup = $ionicPopup.show(popup);
            myPopup.then(addPasajero);
        }

        function addPasajero(pasajero) {
            if (pasajero) {
                vm.solicitud.pasajeros.push(pasajero);
            }
        }

        function showModalEditPasajero(pasajero, index) {
            $scope.pasajero = pasajero;
            var _pasajero = {
                nombre: pasajero.nombre,
                identificacion: pasajero.identificacion
            };
            var myPopup = $ionicPopup.show({
                templateUrl: 'app/solicitud_vehiculo/modal_pasajero.html',
                title: 'Pasajero',
                scope: $scope,
                buttons: [
                    { //cancelar
                        type: 'button-icon ion-reply button-positive button-clear',
                        onTap: function () {
                            console.log(pasajero, _pasajero);
                            pasajero.nomre = _pasajero.nombre;
                            pasajero.identificacion = _pasajero.identificacion;
                            console.log(pasajero, _pasajero);
                        }
                    },
                    { //eliminar
                        type: 'button-icon ion-close button-positive button-clear',
                        onTap: function (e) {
                            return {eliminar: true, index: index}
                        }
                    },
                    { //guardar
                        type: 'button-icon ion-checkmark button-positive button-clear',
                        onTap: function (e) {
                            if (!$scope.pasajero.nombre || !$scope.pasajero.identificacion) {
                                e.preventDefault();
                            }
                        }
                    }
                ]
            });
            myPopup.then(updatePasajeros);
        }

        function updatePasajeros(res) {
            if (res) {
                if (res.eliminar) {
                    vm.solicitud.pasajeros.splice(res.index, 1);
                    if (vm.solicitud.pasajeros.length < 1) {
                        showModalAddPasajero();
                    }
                } else {
                    vm.solicitud.pasajeros[res.index] = res.pasajero;
                }
            }
        }
    }
})();
