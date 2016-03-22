/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('empresas')
        .controller('InfoEmpresaCtrl', InfoEmpresaCtrl);

    /* @ngInject */
    function InfoEmpresaCtrl($scope, $stateParams, empresasService) {

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
        });
        $scope.$on('$ionicView.loaded', function () {
            $scope.empresa ={};
            $scope.centrales = [];
            loadInfo();
        });

        function loadInfo(){
            empresasService.get($stateParams.empresa_id).then(success, error);
            function success(p) {
                $scope.empresa = p.data;
                loadCentrales($scope.empresa.id);
            }
            function error(error) {
                console.log('Error al cargar empresa', error);
            }
        }

        function loadCentrales(empresa_id){
            empresasService.getCentrales(empresa_id).then(success, error);
            function success(p) {
                $scope.centrales = p.data;
            }
            function error(error) {
                console.log('Error al cargar Centrales', error);
            }
        }

    }
})();