/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('auth')
        .controller('RegisterCtrl', RegisterCtrl);

    function RegisterCtrl($scope, authService, $ionicPopup, $state) {
        var vm = this;
        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;

            vm.usuario = {};
            vm.mostrarAdvertencia = false;

            vm.registarCliente = registarCliente;
        });

        function registarCliente(){
            if(vm.usuario.contrasena != vm.usuario.confirmarContrasena ){
                vm.mostrarAdvertencia = true;
                return;
            }
            authService.register(vm.usuario).then(success, error);
            function success(p) {
                if(p.status == 201){
                    mostarAlert("", "Se ha registrado satisfatoriamente");
                    $state.go("login");
                }
            }
            function error(error) {
                mostarAlert("Fallo en el Registro", "No se ha podido realizar el registro intente mas tarde");
            }
        }

        function mostarAlert(titulo,contenido){
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
            alertPopup.then(function (res) {
            });
        }
    }
})();