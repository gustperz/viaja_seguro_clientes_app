/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('conductor')
        .controller('MapaConductorCtrl', MapaConductorCtrl);

    /* @ngInject */
    function MapaConductorCtrl($scope, posicionActual, geoLocationService, socketCh, $stateParams, $ionicLoading, Solicitud) {
        var vm = this;
        var conductor = {};
        vm.markers = [];

        $scope.$on('$ionicView.beforeEnter', function () {
            socketCh.connect();
        });
        $scope.$on('$ionicView.leave', function(){
            socketCh.disconnect();
        });
        $scope.$on('$ionicView.loaded',function(){
            vm.location = posicionActual;
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
        $scope.$on("center_map", function(event){
            var map = vm.map.control.getGMap();
            map.panTo({lat: posicionActual.latitude, lng: posicionActual.longitude})
        });
        socketCh.on('updatePos', function (data) {
            updatePosConductor(data);
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
                control: {}
            };
            vm.markers.push({
                latitude: posicionActual.latitude,
                longitude: posicionActual.longitude,
                options: {
                    icon: {
                        url: 'img/map-marker-current-location.png',
                        scaledSize: {width: 20, height: 20, ma: "px", W: "px"}
                    }
                },
                id: 'yo'
            });
            console.log(Solicitud);
            socketCh.emit('loginCliente', {conductor_id: Solicitud.data.conductor_id})
        }

        function updatePosConductor(data){
            if(conductor.length) {
                conductor.latitude = data.lat;
                conductor.longitude = data.lng;
            }else{
                conductor = {
                    latitude: data.lat,
                    longitude: data.lng,
                    options: {},
                    id: 'conductor'
                }
                vm.markers.push(conductor);
            }
        }
    }
})();
