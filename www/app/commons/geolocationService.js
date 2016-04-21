/**
 * Created by tav0 on 27/02/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .factory('geoLocationService', factory)
        .factory('posicionActual', function(){return {};});

    /* @ngInject */
    function factory($cordovaGeolocation, uiGmapGoogleMapApi, posicionActual, $q, $ionicPopup) {
        var service = {
            current: current,
            decode: decode,
            geocode: geocode,
            checkLocation: checkLocation,
            setPosicionActual: setPosicionActual
        };
        return service;

        function current() {
            var posOptions = {enableHighAccuracy: true, timeout: 20000, maximumAge: 0};
            var cgeo = $cordovaGeolocation.getCurrentPosition(posOptions);
            return cgeo.then(success, error);
            function success(position){
                posicionActual.latitude = position.coords.latitude;
                posicionActual.longitude = position.coords.longitude;
                posicionActual.posCurrentSensor = {lat:position.coords.latitude, lng:position.coords.longitude};
                return decode(posicionActual).then(
                    function(pos){return pos;},
                    error);
            }
            function error(error) {
                console.log('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
                return error;
            }
        }

        function decode(pos){
            return uiGmapGoogleMapApi.then(function(map) {
                var latlng = new map.LatLng(pos.latitude, pos.longitude);
                var geocoder = new map.Geocoder();
                var deferred = $q.defer();
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var res = results[0].formatted_address.split(',');
                        var resdir = res[0].replace(/^\s+|\s+$/g, "").split('-');
                        pos.direccion = resdir[0];
                        pos.basedir = resdir[0];
                        pos.ciudad = res[2].replace(/^\s+|\s+$/g, "");
                        pos.departamento = res[3].replace(/^\s+|\s+$/g, "");
                        pos.fullnameCiudad = res[2].replace(/^\s+|\s+$/g, "")+', '+res[3].replace(/^\s+|\s+$/g, "");
                        return deferred.resolve(pos);
                    }
                    return deferred.reject();
                });
                return deferred.promise;
            });
        }

        function geocode(direccion){
            return uiGmapGoogleMapApi.then(function(map) {
                var geocoder = new map.Geocoder();
                var deferred = $q.defer();
                geocoder.geocode({'address': direccion}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        posicionActual.latitude = results[0].geometry.location.lat();
                        posicionActual.longitude = results[0].geometry.location.lng();
                        return deferred.resolve(posicionActual);
                    }
                    return deferred.reject();
                });
                return deferred.promise;
            });
        }

        function setPosicionActual(pos){
            posicionActual.latitude = pos.latitude;
            posicionActual.longitude = pos.longitude;
            posicionActual.posCurrentSensor = pos.posCurrentSensor;
            posicionActual.direccion = pos.direccion;
            posicionActual.ciudad = pos.ciudad;
            posicionActual.departamento = pos.departamento;
            posicionActual.fullnameCiudad = pos.fullnameCiudad;
        }

        function checkLocation(){
            var defered = $q.defer();
            var promise = defered.promise;
            defered.resolve(true); //TODO: quitar
            return promise; //TODO: quitar
            cordova.plugins.diagnostic.isLocationEnabled(
                function(enabled) {
                    if (enabled){
                        defered.resolve(true);
                    } else {
                        defered.resolve(false);
                        $ionicPopup.alert({
                            content: 'Debe habilitar los servicios de ubicación',
                            buttons: [{type: 'button-icon ion-checkmark button-positive button-clear'}]
                        }).then(function(res) {
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        });
                    }
                },
                function(e) {
                    alert('Error ' + e);
                    defered.reject(e)
                }
            );
            return promise;
        }
    }
})();
