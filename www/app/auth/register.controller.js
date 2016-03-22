/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('auth')
        .controller('RegisterCtrl', RegisterCtrl);

    /* @ngInject */
    function RegisterCtrl($scope, authService, $ionicPopup, $state, GeographicService) {
        var vm = this;
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;

            vm.usuario = {};
            vm.mostrarAdvertencia = false;

            vm.registarCliente = registarCliente;
            vm.loadCiudades = loadCiudades;

            loadDepartamentos();
        });

        function loadDepartamentos(){
            GeographicService.departamentos().then(success, error);
            function success(p) {
                vm.departamentos = p.data;
            }
            function error(error) {
            }

        }

        function loadCiudades(departamento_id){
            GeographicService.ciudades(departamento_id).then(success, error);
            function success(p) {
                vm.ciudades = p.data;
            }
            function error(error) {
            }

        }

        function registarCliente(){
            if(vm.usuario.contrasena != vm.usuario.confirmarContrasena){
                vm.mostrarAdvertencia = true;
                return;
            }
            delete vm.usuario.confirmarContrasena;
            authService.register(vm.usuario).then(success, error);
            function success(p) {
                mostrarAlert("", "Se ha registrado satisfatoriamente");
                $state.go("login");
            }
            function error(error) {
                if(error.status == 409){
                    mostrarAlert("Fallo en el Registro", "Parece que "+vm.usuario.correo+" pertenece a una cuenta ya registrada ");
                    return;
                }
                mostrarAlert("Fallo en el Registro", "No se ha podido realizar el registro intente mas tarde");
            }
        }

        function mostrarAlert(titulo,contenido){
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
            alertPopup.then(function (res) {
            });
        }
    }
})();
