/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('empresas')
        .controller('ListaEmpresasCtrl', ListaEmpresasCtrl)
        .filter('filterCiudadDestino', filterCiudadDestino);

    /* @ngInject */
    function ListaEmpresasCtrl($scope, $state, empresasService, geoLocationService, posicionActual, $ionicLoading) {
        var vm = this;

        $scope.$on('$ionicView.beforeEnter',function(){
            vm.empresas = [];
            $ionicLoading.show();
            geoLocationService.checkLocation().then(function (res) {
                if(!res){
                    loadEmpresas();
                }
                if(!posicionActual.latitude || !posicionActual.longitude){
                    geoLocationService.current().then(function()    {
                        console.log(posicionActual)
                        loadEmpresas({ciudad: posicionActual.place_id});
                    },function(error) {});
                } else {
                    loadEmpresas({ciudad: posicionActual.ciudad});
                }
            })
        });

        vm.infoEmpresa = infoEmpresa;


        function loadEmpresas(rest){
            rest || (rest = false);
            empresasService.getAll(rest).then(success, error);
            function success(p) {
                vm.empresas = p.data.data;
                $ionicLoading.hide();
            }
            function error(error){
                $ionicLoading.hide();
                console.log('Error al cargar datos', error);
            }
        }

        function infoEmpresa(empresa){
            $state.go('app.empresa_detalles', {'empresa_id' : empresa.id});
        }
    }

    function filterCiudadDestino() {
        return function (empresas, ciudad_destino) {
            if(!ciudad_destino) return empresas;
            var result = [];
            angular.forEach(empresas, function (empresa, key) {
                angular.forEach(empresa.centrales, function (central, key2) {
                    if (central.ciudad.nombre.toLowerCase().indexOf(ciudad_destino.toLowerCase()) != -1) {
                        result.push(empresa);
                    }
                })
            });
            return result;

        }
    };
})();