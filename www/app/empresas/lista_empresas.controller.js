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
                    console.log(res)
                    loadEmpresas();
                }
                if(!posicionActual.latitude || !posicionActual.longitude){
                    geoLocationService.current().then(function(res){
                        console.log(res)
                        console.log(posicionActual)
                        vm.place = posicionActual.place
                        vm.place.solo_locality = true;
                        loadEmpresas({ciudad: vm.place.locality});
                    },function(error) {});
                } else {
                    loadEmpresas();
                }
            })
        });

        vm.infoEmpresa = infoEmpresa;


        function loadEmpresas(rest){
            rest || (rest = false);
            empresasService.getAll(rest).then(success, error);
            function success(p) {
                vm.empresas = p.data.data;
                if(!vm.empresas.length && vm.place.solo_locality) {
                    vm.place.solo_locality = false;
                    posicionActual.place_id = vm.place.administrative_area;
                    return loadEmpresas({ciudad: vm.place.administrative_area});
                }
                else if(!vm.empresas.length) {
                    posicionActual.place_id = undefined;
                    return loadEmpresas();
                }
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