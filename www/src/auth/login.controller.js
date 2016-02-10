/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('auth')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, authService, $ionicPopup, $state) {
        $scope.$on('$ionicView.enter',function(){
            $scope.usuario = {};
            $scope.matenerSesion = false
        });

        $scope.iniciarSesion = function(){
            authService.login($scope.usuario).then(success, error);
            function success(p) {
                authService.storeUser(p.data.token);
                if(authService.currentUser().rol == "CLIENTE"){
                    $state.go('app.lista_empresas');
                }
            }
            function error(error) {
                mostarAlert("Error login","Error al logear verifique que los datos ingresados sean correctos");
                //$scope.mensajeError = error.status == 401 ? error.data.mensajeError : 'A ocurrido un erro inesperado';
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