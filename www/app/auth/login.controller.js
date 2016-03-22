/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('auth')
        .controller('LoginCtrl', LoginCtrl);

    /* @ngInject */
    function LoginCtrl($scope, authService, mostrarAlert, $state, HOME, $ionicLoading) {
        var vm = this;
        vm.usuario = {};
        vm.matenerSesion = true;

        vm.iniciarSesion = iniciarSesion;

        $scope.$on('$ionicView.beforeEnter', function () {
            autologin();
        });

        function iniciarSesion(){
            $ionicLoading.show();
            authService.login(vm.usuario).then(success, error);
            function success(p) {
                if(vm.matenerSesion){
                    authService.local.setCredenciales(vm.usuario);
                }
                authService.storeUser(p.data.token);
                authService.updateRegId();
                if(authService.currentUser().rol == "CLIENTE"){
                    $ionicLoading.hide();
                    $state.go(HOME);
                }
            }
            function error(error) {
                $ionicLoading.hide();
                authService.local.destroyCredenciales();
                mostrarAlert("Error login "+error.status,"Error al logear verifique que los datos ingresados sean correctos");
            }
        }

        function autologin(){
            vm.usuario = authService.local.getCredenciales();
            if(vm.usuario){
                iniciarSesion();
            }else{
                $ionicLoading.hide();
            }
        }

    }
})();
