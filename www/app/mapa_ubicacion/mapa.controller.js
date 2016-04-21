/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('mapa_ubicacion')
        .controller('MapaMiDireccionCtrl', MapaMiDireccionCtrl);

    /* @ngInject */
    function MapaMiDireccionCtrl($scope, $ionicLoading, posicionActual, geoLocationService, $timeout, $ionicHistory) {
        var vm = this;

        vm.decodeDireccion = decodeDireccion;

        $scope.$on('$ionicView.beforeEnter', function(event){
            screen.lockOrientation('portrait');
        });
        $scope.$on('$ionicView.leave', function(){
            screen.unlockOrientation();
        });
        $scope.$on('$ionicView.loaded',function(){
            $ionicLoading.show();
            geoLocationService.checkLocation().then(function (res) {
                if(!res){
                    $ionicLoading.hide();
                    $ionicHistory.goBack();
                } else {
                    vm.location = posicionActual;
                    if(!posicionActual.latitude || !posicionActual.longitude){
                        geoLocationService.current().then(function(){
                            setMap();
                            $ionicLoading.hide();
                        },function(error) {});
                    } else {
                        $ionicLoading.hide();
                        setMap();
                    }
                }
            })
        });
        $scope.$on('center_map', function(event){
            var map = vm.map.control.getGMap();
            map.panTo({lat: posicionActual.latitude, lng: posicionActual.longitude});
            vm.marker.coords = {latitude: posicionActual.latitude, longitude: posicionActual.longitude};
        });

        function setMap(){
            vm.map = {
                center: {latitude: posicionActual.latitude, longitude: posicionActual.longitude},
                zoom: 17,
                options: {
                    streetViewControl: false,
                    zoomControl: false,
                    mapTypeControl: false
                },
                events:{
                    dragend: function(){
                        $timeout(decodeLocation, 900);
                    }
                },
                control: {}
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

        function decodeDireccion(){
            var direccion = vm.location.ciudad+', colombia, '+vm.location.direccion;
            geoLocationService.geocode(direccion).then(function(){
                $scope.$emit('center_map');
            },function(error) {});
        }
    }
})();
