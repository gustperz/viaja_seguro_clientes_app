/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('empresas')
        .controller('MapaMiDireccionCtrl', MapaMiDireccionCtrl)
        .controller('direccionCtrl', direccionCtrl);

    function MapaMiDireccionCtrl($scope, $ionicLoading, geoLocationService, uiGmapGoogleMapApi) {
        var vm = this;
        $scope.$on('$ionicView.loaded',function(){
            vm.ciudad = 'Fonsega - La Guajira';
            setMap();
        });

        function setMap(){
            $ionicLoading.show();
            geoLocationService.current().then(function(pos){
                //decode(pos);
                vm.map = {
                    center: {latitude: pos.lat, longitude: pos.lng},
                    zoom: 17,
                    options: {
                        streetViewControl: false,
                        mapTypeControl: false
                    }
                };
                vm.marker = {
                    coords: vm.map.center,
                    show: false,
                    id: 0
                };
                $ionicLoading.hide();
            });
        }

    }

    function direccionCtrl(geoLocationService){
        var vm = this;
        vm.ciudad = geoLocationService.posicionActual.ciudad;
        vm.direccion = geoLocationService.posicionActual.direccion;
    }
})();
