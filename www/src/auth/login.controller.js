/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('auth')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl(authService, mostarAlert, $state, $ionicLoading) {
        var vm = this;
        vm.usuario = {};
        vm.matenerSesion = true;

        vm.iniciarSesion = iniciarSesion;

        autologin();

        function iniciarSesion(){
            $ionicLoading.show();
            authService.login(vm.usuario).then(success, error);
            function success(p) {
                if(vm.matenerSesion){
                    authService.local.setCredenciales(vm.usuario);
                }
                authService.storeUser(p.data.token);
                if(authService.currentUser().rol == "CLIENTE"){
                    $ionicLoading.hide();
                    $state.go('app.lista_empresas');
                }
            }
            function error(error) {
                $ionicLoading.hide();
                mostarAlert("Error login "+error.status,"Error al logear verifique que los datos ingresados sean correctos");
            }
        }

        function autologin(){
            $ionicLoading.show();
            vm.usuario = authService.local.getCredenciales();
            if(vm.usuario){
                authService.login(vm.usuario).then(success, error);
            }else{
                $ionicLoading.hide();
            }
            function success(p) {
                authService.storeUser(p.data.token);
                if(authService.currentUser().rol == "CLIENTE"){
                    $ionicLoading.hide();
                    $state.go('app.lista_empresas');
                }
            }
            function error(error) {
                $ionicLoading.hide();
                authService.local.destroyCredenciales();
            }
        }
    }
})();
