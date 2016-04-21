/**
 * Created by tav0 on 4/02/16.
 */

(function () {
    'use strict';

    angular
        .module('solicitudes')
        .controller('SolicitarVehiculoCtrl', SolicitarVehiculoCtrl);

    /* @ngInject */
    function SolicitarVehiculoCtrl($scope, authService, $ionicPopup, Solicitud) {
        var vm = this;

        vm.user = authService.currentUser();
        Solicitud.data = {};
        vm.solicitud = Solicitud.data;
        Solicitud.data.tipo = 'vehiculo';
        vm.solicitud.pasajeros = [{'nombre': vm.user.nombre, identificacion: parseInt(vm.user.identificacion)}];

        vm.showModalAddPasajero = showModalAddPasajero;
        vm.showModalEditPasajero = showModalEditPasajero;

        function showModalAddPasajero() {
            $scope.pasajero = {};
            var popup = {
                templateUrl: 'app/solicitudes/solicitud_vehiculo/modal_pasajero.html',
                title: 'Agregar pasajero',
                scope: $scope,
                cssClass: 'cutompopup'
            };
            if (Solicitud.data.pasajeros.length < 1) {
                popup.buttons = [
                    {
                        type: 'button button-positive',
                        text: '<b>Agregar</b>',
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
                        type: 'button button-positive',
                        text: '<b>Agregar</b>',
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
                Solicitud.data.pasajeros.push(pasajero);
            }
        }

        function showModalEditPasajero(pasajero, index) {
            $scope.pasajero = pasajero;
            var _pasajero = {
                nombre: pasajero.nombre,
                identificacion: pasajero.identificacion
            };
            var myPopup = $ionicPopup.show({
                templateUrl: 'app/solicitudes/solicitud_vehiculo/modal_pasajero.html',
                title: 'Pasajero',
                scope: $scope,
                cssClass: 'cutompopup',
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
                        type: 'button button-positive',
                        text: '<b>Eliminar</b>',
                        onTap: function (e) {
                            return {eliminar: true, index: index};
                        }
                    },
                    { //guardar
                        type: 'button button-positive',
                        text: '<b>Aceptar</b>',
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
                    Solicitud.data.pasajeros.splice(res.index, 1);
                    if (Solicitud.data.pasajeros.length < 1) {
                        showModalAddPasajero();
                    }
                } else {
                    Solicitud.data.pasajeros[res.index] = res.pasajero;
                }
            }
        }
    }
})();
