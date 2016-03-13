/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('mapa_ubicacion')
        .controller('MapaMiDireccionCtrl', MapaMiDireccionCtrl)
        .controller('direccionCtrl', direccionCtrl);

    function MapaMiDireccionCtrl($scope, $ionicLoading, posicionActual, geoLocationService, $timeout) {
        var vm = this;
        $scope.$on('$ionicView.loaded',function(){
            vm.ciudad = 'Fonsega - La Guajira';
            if(!posicionActual.lat || !posicionActual.lng){
                $ionicLoading.show();
                geoLocationService.current().then(function(){
                    setMap();
                    $ionicLoading.hide();
                },function(error) {});
            } else {
                setMap();
            }
        });

        function setMap(){
            vm.location = posicionActual;
            vm.map = {
                center: {latitude: posicionActual.latitude, longitude: posicionActual.longitude},
                zoom: 17,
                options: {
                    streetViewControl: false,
                    mapTypeControl: false
                },
                events:{
                    dragend: function(){
                        $timeout(decodeLocation, 900)
                    }
                }
            };
            vm.marker = {
                coords: {latitude: posicionActual.latitude, longitude: posicionActual.longitude},
                options: {
                    icon: {
                        url: 'img/map-marker-current-location.png',
                        scaledSize: new google.maps.Size(20, 20)
                    }
                },
                show: false,
                id: 0
            };
        }

        function decodeLocation(){
            posicionActual.latitude = vm.map.center.latitude;
            posicionActual.longitude = vm.map.center.longitude;
            geoLocationService.decode(posicionActual)
                .then(function(pos){
            },function(){
                console.log('error');
            });
        }

    }

    function direccionCtrl(posicionActual, geoLocationService, $ionicLoading){
        var vm = this;
        vm.location = posicionActual;
        vm.goCurentPos = goCurentPos;
        vm.decodeDireccion = decodeDireccion;

        function goCurentPos(){
            $ionicLoading.show();
            geoLocationService.current().then(function(){
                $ionicLoading.hide();
            },function(error) {});
        }

        function decodeDireccion(){
            $ionicLoading.show();
            var direccion = vm.location.ciudad+', '+vm.location.direccion;
            geoLocationService.geocode(direccion).then(function(){
                console.log(posicionActual);
                $ionicLoading.hide();
            },function(error) {});
        }
    }
})();
