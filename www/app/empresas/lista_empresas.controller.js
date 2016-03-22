/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('empresas')
        .controller('ListaEmpresasCtrl', ListaEmpresasCtrl);

    /* @ngInject */
    function ListaEmpresasCtrl($scope, $state, empresasService) {
        $scope.$on('$ionicView.loaded',function(){
            $scope.empresas = [];
            loadEmpresas();
        });

        $scope.showServiciosEmpresa = showServiciosEmpresa;

        function loadEmpresas(){
            empresasService.getAll().then(success, error);
            function success(p) {
                $scope.empresas = p.data;
            }
            function error(error) {
                console.log('Error al cargar datos', error);
            }
        }

        function showServiciosEmpresa(empresa){
            $state.go('app.servicios_empresa', {'empresa_id' : 1});
        }
    }
})();