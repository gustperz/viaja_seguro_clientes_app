/**
 * Created by tav0 on 4/02/16.
 */

(function() {
    'use strict';

    angular
        .module('empresas')
        .controller('InfoEmpresaCtrl', InfoEmpresaCtrl);

    /* @ngInject */
    function InfoEmpresaCtrl($scope, $stateParams, empresasService, geoLocationService, posicionActual, $ionicLoading,
                             solicitudesService, uiGmapIsReady) {

        var vm = this;
        var no_direction = false;

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;
            $ionicLoading.show();
            geoLocationService.checkLocation().then(function (res) {
                if(!res){
                    no_direction = true;
                    $ionicLoading.hide();
                }
                if(!posicionActual.latitude || !posicionActual.longitude){
                    geoLocationService.current().then(function(){
                        loadCiudades();
                        $ionicLoading.hide();
                    },function(error) {});
                } else {
                    loadCiudades();
                    $ionicLoading.hide();
                }
            })
        });

        $scope.$on('$ionicView.loaded', function () {
            vm.empresa ={};
            vm.centrales = [];
            loadInfo();
        });

        function loadInfo(){
            empresasService.get($stateParams.empresa_id).then(success, error);
            function success(p) {
                vm.empresa = p.data;
            }
            function error(error) {
                console.log('Error al cargar empresa', error);
            }
        }

        function loadCiudades() {
            vm.centralLocal = {};
            var empresa_id = $stateParams.empresa_id;
            solicitudesService.getCentral(empresa_id, posicionActual.ciudad).then(success, error);
            function success(p) {
                vm.centralLocal = p.data;
                $ionicLoading.hide();
                setMap()
            }

            function error(error) {
                console.log('Error al cargar datos', error);
                $ionicLoading.hide();
            }
        }

        function setMap(){
            vm.map = {
                center: {latitude: vm.centralLocal.miDireccionLa, longitude: vm.centralLocal.miDireccionLo},
                zoom: 14,
                options: {
                    streetViewControl: false,
                    zoomControl: false,
                    mapTypeControl: false
                },
                control: {}
            };
            vm.marker = {
                coords: {latitude: vm.centralLocal.miDireccionLa, longitude: vm.centralLocal.miDireccionLo},
                show: false,
                id: 0
            };

            if(!no_direction){
                uiGmapIsReady.promise().then(function(){
                    var directionsDisplay = new google.maps.DirectionsRenderer();
                    var displayedMap = vm.map.  control.getGMap();

                    var start = new google.maps.LatLng(posicionActual.latitude, posicionActual.longitude);
                    var end = new google.maps.LatLng(vm.centralLocal.miDireccionLa, vm.centralLocal.miDireccionLo);

                    var request = {
                        origin:start,
                        destination:end,
                        travelMode: google.maps.TravelMode.DRIVING
                    };

                    var directionsService = new google.maps.DirectionsService();
                    directionsService.route(request, function (directions, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setOptions({ suppressMarkers: true });
                            directionsDisplay.setMap(displayedMap);
                            directionsDisplay.setDirections(directions);
                            vm.distancia = directions.routes[0].legs[0].distance.text;
                            vm.tiempo = directions.routes[0].legs[0].duration.text;;
                        }
                    });
                });
            }
        }

    }
})();